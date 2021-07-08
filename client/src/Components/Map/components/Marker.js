import React from "react";
import { Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
export const MarkerComponent = (props) => {
  const { index, name, lat, lng } = props;
  //const clickInMaker = useCallback(() => {
   // console.log(markertmp);
  //}, []);

  return (
    <>
      <Marker
        //icon={}
        key={`google-marker-${index}`}
        label={{
          className: "makerTitle",
          text: name,
        }}
        position={{
          lat: lat,
          lng: lng,
        }}
        //onClick={(e) => clickInMaker(marker)}
      />
    </>
  );
};
MarkerComponent.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  marker: PropTypes.object,
};
