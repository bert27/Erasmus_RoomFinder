import React from "react";
import "./elements.sass";

import { ElementCard } from "./ElementCard";
export const Elements = (props) => {
  const { data, errorServer } = props;

  return (
    <>
      <div className="containerMap_father">
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
       //option Skeleton or Spinner
          <div className="containerMap minheightUI">...Loading</div>
        )}
        {errorServer && (
          <div className="containerMap minheightUI">Error in server</div>
        )}
      </div>
    </>
  );
};