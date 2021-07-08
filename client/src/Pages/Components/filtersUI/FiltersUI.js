import React from "react";
import { DropdownC } from "../../../Components/Dropdown/Dropdown";

import Button from "../../../Components/Button/Button";
import "./filtersUI.sass";
import { Map } from "../../../Components/Map/Map";
import PropTypes from "prop-types";

export const FiltersUI = (props) => {
  const {
    OnchangeoptionChoose,
    OnchangeoptionCity,
    OnchangePropietyType,
    optionsPrice,
    optionsType,
    optionsCity,
    downloadJson,
    flag,
  } = props;

  return (
    <>
      <div className="containerMap_father">
        <Map />

        <div className="filterUI">
          <div className="filterUIc">
            <div className="filtersdiv">
              <div className="filterUI_c title_head">Filters:</div>
              <div className="propieties_filterUI">
                <div className="filterUI_c">
                  <div className="titleOption">Choose City:</div>
                  <DropdownC
                    options={optionsCity}
                    OnoptionChoose={OnchangeoptionCity}
                  />
                </div>

                <div className="filterUI_c">
                  <div className="titleOption">Propiety type:</div>
                  <DropdownC
                    options={optionsType}
                    OnoptionChoose={OnchangePropietyType}
                    flag={flag}
                  />
                </div>

                <div className="filterUI_c">
                  <div className="titleOption">Short by Price:</div>
                  <DropdownC
                    options={optionsPrice}
                    OnoptionChoose={OnchangeoptionChoose}
                    flag={flag}
                  />
                </div>
              </div>
            </div>

            <div className="Button_filterUI">
              <Button
                name={"Download JSON"}
                onclick={downloadJson}
                oneButton={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FiltersUI.propTypes = {
  OnchangeoptionChoose: PropTypes.func.isRequired,
  OnchangeoptionCity: PropTypes.func.isRequired,
  OnchangePropietyType: PropTypes.func.isRequired,
  optionsPrice: PropTypes.object.isRequired,
  optionsType: PropTypes.object.isRequired,
  optionsCity: PropTypes.object.isRequired,
  downloadJson: PropTypes.func.isRequired,
  flag: PropTypes.number.isRequired,
};
