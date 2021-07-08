import React, { useState, useCallback } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { MapsService } from "../../../Services/Maps_Controller.service";
import { apiKey } from "../keyGoogleMaps";
import PropTypes from "prop-types";

export const StandaloneSearchBoxComponent = (props) => {
  const { saveMarker } = props;
  const [reference, setreference] = useState(undefined);

  //save reference maker
  const onSBLoad = useCallback((searchBox) => {
    setreference(searchBox);
  });

  //get coordinates of the new maker
  const onPlacesChanged = useCallback(() => {
    const places = reference.getPlaces();
    const firstplace_id = places[0].place_id;
    const name = places[0].formatted_address;
    MapsService.getCoordinates(firstplace_id, apiKey).then((coordenates) => {
      coordenates.name = name;
      goToNewMaker(coordenates);
    });
  });

  //Save new maker
  const goToNewMaker = useCallback((newMaker) => {
    saveMarker(newMaker);
  });
  return (
    <>
      <div id="searchbox">
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={() => {
            onPlacesChanged();
          }}
        >
          <input
            type="text"
            placeholder="Buscar.."
            className="inputSearch"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
      </div>
    </>
  );
};

StandaloneSearchBoxComponent.propTypes = {
  saveMarker: PropTypes.func.isRequired,
};