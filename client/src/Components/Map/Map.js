import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.sass";
import PropTypes from "prop-types";
import { MarkerComponent } from "./components/Marker";
import { StandaloneSearchBoxComponent } from "./components/StandaloneSearchBox";
import { apiKey } from "./keyGoogleMaps";

export const Map = (props) => {
  const { coordinatesSitesforMap, cityChoose } = props;
  const levelZoomStart = 11;

  const [coordinateStart, setcoordinateStart] = useState({
    lat: 40.416775,
    lng: -3.70379,
  });
  const [markersView, setmarkersView] = useState(undefined);
  const [markers, setmarkers] = useState([]);

  const optionsCity = [
    { value: "madrid", label: "Madrid" },
    { value: "barcelona", label: "Barcelona" },
    { value: "london", label: "London" },
  ];

  //Options Google Map:
  const defaultOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  // show makers
  //Si se desea que todos los componentes esten en la vista, cambiar a true o false
  // {makersview && <><MarkerComponent .../></>}
  useEffect(() => {
    if (markers.length > 0) {
      setmarkersView(
        markers.map((marker, index) => (
          <div key={index}>
            <MarkerComponent
              index={index}
              name={marker?.name}
              lat={marker?.lat}
              lng={marker?.lng}
              marker={marker}
            />
          </div>
        ))
      );
    }
  }, [markers]);

  useEffect(() => {
    if (cityChoose === optionsCity[0].value) {
      setcoordinateStart({ lat: 40.416775, lng: -3.70379 });
    } else if (cityChoose === optionsCity[1].value) {
      setcoordinateStart({ lat: 41.390205, lng: 2.154007 });
    } else if (cityChoose === optionsCity[2].value) {
      setcoordinateStart({ lat: 51.509865, lng: -0.118092 });
    }
  }, [cityChoose]);

  useEffect(() => {
    let markerstmp = [];
    coordinatesSitesforMap.forEach((coordinatesiteMap) => {
      const markert = {
        lat: coordinatesiteMap.coord[1],
        lng: coordinatesiteMap.coord[0],
        name: "Apartment",
      };

      markerstmp.push(markert);
    });
    setmarkers(markerstmp);
  }, [coordinatesSitesforMap]);

  const saveMarker = useCallback(
    (newMarker) => {
      setmarkers([...markers, newMarker]);
    },
    [markers]
  );

  return (
    <div className="marcMap">
      <div className="contentMap">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={apiKey}
          libraries={["places"]}
        >
          <div className="MapPage1">
            <GoogleMap
              zoom={levelZoomStart}
              center={coordinateStart}
              id="map"
              options={defaultOptions}
              mapContainerClassName={"map"}
            >
              <StandaloneSearchBoxComponent saveMarker={saveMarker} />
              {markersView}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};
Map.propTypes = {
  coordinatesSitesforMap: PropTypes.object.isRequired,
  cityChoose: PropTypes.string.isRequired,
};
