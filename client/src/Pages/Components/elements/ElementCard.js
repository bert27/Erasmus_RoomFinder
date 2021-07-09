import React, { useCallback, useEffect, useState, useRef } from "react";
import Button from "../../../Components/Button/Button";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

export const ElementCard = (props) => {
  const { element, goToElement } = props;
  //select when click in marker map
  const [cardSelect, setcardSelect] = useState(false);
  const myRef = useRef(null);
  useEffect(() => {
    if (goToElement === element?.adId) {
      setcardSelect(true);
      myRef.current.scrollIntoView();
    } else {
      setcardSelect(false);
    }
  }, [goToElement, element]);

  const moreDetails = useCallback(() => {
    // console.log("moreDetails");
  }, []);

  const bookNow = useCallback(() => {
    //console.log("bookNow");
  }, []);
  return (
    <>
      <div
        className={cardSelect ? "containerMap cardselect" : "containerMap"}
        data-testid="card"
        ref={myRef}
      >
        {element?.photoUrls ? (
          <div className="cardElement_image">
            <img
              src={element?.photoUrls?.homecard}
              alt="description"
              className="imgTest"
            />
          </div>
        ) : (
          <Skeleton width={150} height={100} />
        )}

        <div className="cardElement_column cardElement_description">
          {element?.title || <Skeleton />}
        </div>

        <div className="cardElement_column cardElement_buttonsAndPrice">
          <div className="price_cardElement">
            {element?.pricePerMonth ? (
              <>
                <div className="price_cardElementc">
                  {element?.pricePerMonth}€
                </div>
              </>
            ) : (
              <Skeleton width={60} height={30} />
            )}
          </div>

          <div className="cardElement_buttons ">
            {element ? (
              <Button
                name={
                  <div className="detailsButton">
                    <div>More </div>
                    <div>Details </div>
                  </div>
                }
                onclick={moreDetails}
              />
            ) : (
              <div className="button">
                <Skeleton height={30} />
              </div>
            )}
            {element ? (
              <Button
                name={
                  <div className="detailsButton">
                    <div>book </div>
                    <div>now </div>
                  </div>
                }
                isSecondary={true}
                onclick={bookNow}
              />
            ) : (
              <div className="button">
                <Skeleton height={30} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

ElementCard.propTypes = {
  element: PropTypes.object.isRequired,
  goToElement: PropTypes.number.isRequired,
};
