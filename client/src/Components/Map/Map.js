import React, { useEffect, useState,useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.sass";

import { MarkerComponent } from "./components/Marker";
import { StandaloneSearchBoxComponent } from "./components/StandaloneSearchBox";
import { apiKey } from "./keyGoogleMaps";
export const Map = () => {
  const levelZoomStart = 7;
  const CoordinateStart = { lat: 38.932749, lng: -0.186515 };
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
            />
          </div>
        ))
      );
    }
  }, [markers]);

  const saveMarker = useCallback((newMarker) => {
    setmarkers([...markers, newMarker]);
  }, [markers]);

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
              center={CoordinateStart}
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
