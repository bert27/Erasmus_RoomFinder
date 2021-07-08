import React from "react";
import "./elements.sass";
import { ElementCard } from "./ElementCard";
import PropTypes from "prop-types";

export const Elements = (props) => {
  const { data, errorServer } = props;

  return (
    <>
      <div className="containerMap_fatherc">
        {data?.length > 0 && data && (
          <>
            {data.map((element, key) => (
              <ElementCard element={element} key={key} />
            ))}
          </>
        )}

        {data?.length === 0 && data && (
          <div className="containerMap minheightUI">
            No se encontro ningún resultado
          </div>
        )}
        {!data && !errorServer && (
          //skeleton
          <div className="skeletonf">
            <ElementCard />
            <ElementCard />
            <ElementCard />
            <ElementCard />
          </div>
        )}
        {errorServer && (
          <div className="containerMap minheightUI">Error in server</div>
        )}
      </div>
    </>
  );
};

Elements.propTypes = {
  data: PropTypes.object.isRequired,
  errorServer: PropTypes.bool.isRequired,
};
