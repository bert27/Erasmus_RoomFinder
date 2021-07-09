import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.sass";
import PropTypes from "prop-types";
import { MarkerComponent } from "./components/Marker";
import { StandaloneSearchBoxComponent } from "./components/StandaloneSearchBox";
import { apiKey } from "./keyGoogleMaps";

export const Map = (props) => {
  const { coordinatesSitesforMap, cityChoose, optionsCity,navigationToMarkerClick } = props;
  const levelZoomStart = 11;

  const [coordinateStart, setcoordinateStart] = useState({
    lat: 40.416775,
    lng: -3.70379,
  });
  const [markersView, setmarkersView] = useState(undefined);
  const [markers, setmarkers] = useState([]);

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
              id={marker.id}
              navigationToMarkerClick={navigationToMarkerClick}
            />
          </div>
        ))
      );
    }
  }, [markers]);

  useEffect(() => {
    optionsCity.forEach((optionCity) => {
      if (cityChoose === optionCity.value) {
        setcoordinateStart(optionCity.coords);
      }
    });
  }, [cityChoose]);

  useEffect(() => {
    let markerstmp = [];
    coordinatesSitesforMap.forEach((coordinatesiteMap) => {
      const markert = {
        lat: coordinatesiteMap.coord[1],
        lng: coordinatesiteMap.coord[0],
        name: coordinatesiteMap.title,
        id: coordinatesiteMap.adId,
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
  optionsCity: PropTypes.object.isRequired,
  navigationToMarkerClick: PropTypes.func.isRequired,
};
