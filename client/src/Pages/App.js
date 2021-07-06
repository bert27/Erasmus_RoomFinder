import React, { useCallback, useState, useEffect, useMemo } from "react";
import { ApartmentsService } from "../Services/Apartaments_Controller.service";
import { Head } from "./Components/head/Head";
import { FiltersUI } from "./Components/filtersUI/FiltersUI";
import { Elements } from "./Components/elements/Elements";
import "./app.sass";
import "./app.css";
export const App = () => {
  //Save data get:
  const [data, setdata] = useState(undefined);
  const NumberMaxResults = 30;
  //----Initial Types:-----

  const optionsCity = [
    { value: "madrid", label: "Madrid" },
    { value: "barcelona", label: "Barcelona" },
    { value: "london", label: "London" },
  ];

  const optionsType = [
    { value: "all", label: "All" },
    { value: "studios", label: "Studio" },
    { value: "apartments", label: "Apartment" },
    { value: "rooms", label: "Rooms" },
    { value: "residences", label: "Residences" },
  ];

  const optionsPrice = useMemo(() => {
    return [
      { value: "Ascending", label: "Ascending" },
      { value: "Descending", label: "Descending" },
    ];
  }, []);
  //save in memory options choose in Dropdowns:
  const [cityChoose, setcityChoose] = useState(optionsCity[0].value);
  const [modesort, setmodesort] = useState(optionsPrice[0].value);
  const [errorServer, seterrorServer] = useState(false);
  //if change city reset others dropdowns
  const [flag, setflag] = useState(0);
  //load All in Madrid Initial:
  useEffect(() => {
    refresh(cityChoose);
  }, [cityChoose]);

  //Load NumberMaxResults results of City choose:
  const refresh = useCallback(
    (city) => {
      setdata(undefined);
      ApartmentsService.getMarkers(city).then(
        (markers) => {
          prepareNumberMaxResults(markers, NumberMaxResults);
        },
        (error) => {
          alert(error);
          seterrorServer(true);
        }
      );
    },
    [optionsPrice, modesort]
  );
  //Order reset dropdowns force navigation in down by props.
  const resetDropdowns = useCallback(() => {
    setflag(flag + 1);
    setmodesort(optionsPrice[0].value);
  }, [flag]);

  //Change optionsType
  const OnchangePropietyType = useCallback(
    (optionChoose) => {
      setdata(undefined);
      ApartmentsService.getApartments_types(optionChoose.value, cityChoose).then(
        (apartments_types) => {
          prepareNumberMaxResults(apartments_types, NumberMaxResults);
        },
        (error) => {
          alert(error);
        }
      );
    },
    [cityChoose, optionsPrice, modesort]
  );

  //Ascending / Descending:
  const OnchangeoptionChoose = useCallback(
    (option) => {
      if (data) {
        switch (option.value) {
          case optionsPrice[0].value:
            setmodesort(option.value);
            setdata([
              ...data.sort(
                (a, b) =>
                  parseFloat(a.pricePerMonth) - parseFloat(b.pricePerMonth)
              ),
            ]);

            break;
          case optionsPrice[1].value:
            setmodesort(option.value);
            setdata([
              ...data.sort(
                (a, b) =>
                  parseFloat(b.pricePerMonth) - parseFloat(a.pricePerMonth)
              ),
            ]);
            break;

          default:
            //console.log("Error");
            break;
        }
      }
    },
    [data]
  );
  //Change city:
  const OnchangeoptionCity = useCallback(
    (option) => {
      //save city
      setcityChoose(option.value);
      resetDropdowns();
      refresh(option.value);
    },
    [flag]
  );

  //Download JSON:
  const downloadJson = useCallback(() => {
    const json = JSON.stringify(data);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `results_Spotaroom.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }, [data]);
  //Get data to server: -- EndPoint / Callback Aux
  const prepareNumberMaxResults = useCallback(
    (markerstmp, numberMax) => {
      if (markerstmp) {
        const markers = markerstmp.data.slice(0, numberMax);
        let idsTotal = "";
        markers.forEach((marker) => {
          idsTotal = idsTotal + (marker?.adId + "&ids[]=");
        });

        ApartmentsService.getDetailsMarkers(idsTotal).then(
          (details) => {
            const result = details?.data?.homecards;
            if (result) {
              const objects2 = details?.data.homecards.slice(
                0,
                NumberMaxResults
              );
              /* Change of property type taking into account whether 
             the descending or ascending option is selected*/
              if (modesort === optionsPrice[0].value) {
                setdata(
                  objects2.sort(
                    (a, b) =>
                      parseFloat(a.pricePerMonth) - parseFloat(b.pricePerMonth)
                  )
                );
              } else {
                setdata(
                  objects2.sort(
                    (a, b) =>
                      parseFloat(b.pricePerMonth) - parseFloat(a.pricePerMonth)
                  )
                );
              }
            }
          },
          (error) => {
            alert(error);
          }
        );
      }
    },
    [optionsPrice, modesort]
  );

  return (
    <div className="web">
      <Head />
      <>
        <div className="PanelUI">
          {/*types and fuctions in props -  Controller*/}
          <FiltersUI
            optionsPrice={optionsPrice}
            optionsType={optionsType}
            optionsCity={optionsCity}
            downloadJson={downloadJson}
            OnchangeoptionChoose={OnchangeoptionChoose}
            OnchangeoptionCity={OnchangeoptionCity}
            OnchangePropietyType={OnchangePropietyType}
            flag={flag}
          />
          {/*Visualize cards*/}
          <Elements data={data} errorServer={errorServer} />
        </div>
      </>
    </div>
  );
};
