import React, { useCallback } from "react";
import { Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import ImgMarker from "./iconMarker.png";

export const MarkerComponent = (props) => {
  const { index, name, lat, lng, id,navigationToMarkerClick } = props;

  const clickInMaker = useCallback(() => {
    navigationToMarkerClick(id);
  }, [id]);


  return (
    <>
      <Marker
        icon={{
          url: ImgMarker,
          anchor: new window.google.maps.Point(20, 20),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
        key={`google-marker-${index}`}
        label={{
          className: "makerTitle",
          text: name,
        }}
        position={{
          lat: lat,
          lng: lng,
        }}
      
        onClick={() => clickInMaker()}
      />
    </>
  );
};
MarkerComponent.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  marker: PropTypes.object,
  navigationToMarkerClick: PropTypes.func.isRequired,
  
};
