import React, { useCallback} from "react";
import { Button } from "../../../Components/Button/Button";
export const ElementCard = (props) => {
  const { element } = props;

  const moreDetails = useCallback(() => {
   // console.log("moreDetails");
  }, []);

  const bookNow = useCallback(() => {
    //console.log("bookNow");
  }, []);
  return (
    <>
      <div className="containerMap" data-testid="card">
        <div className="cardElement_image">
          <img src={element?.photoUrls?.homecard} alt="description" className="imgTest" />
        </div>
        <div className="cardElement_column cardElement_description">
          {element?.title}
        </div>

        <div className="cardElement_column cardElement_buttonsAndPrice">
          <div className="price_cardElement">
            <div className="price_cardElementc">{element?.pricePerMonth}€</div>
          </div>

          <div className="cardElement_buttons ">
            <Button name={"More details"} onclick={moreDetails} />
            <Button name={"Book now!"} isSecondary={true} onclick={bookNow} />
          </div>
        </div>
      </div>
    </>
  );
};
