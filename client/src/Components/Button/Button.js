import React, { useCallback } from "react";
import "./Button.sass";
import PropTypes from "prop-types";



export const Button = (props) => {
  const { name, isSecondary, onclick, oneButton } = props;

  const getClassName = useCallback(() => {
    let classNamev = "";

    if (!isSecondary) {
      classNamev = "button button_card";
    } else {
      classNamev = "button button_secondary";
    }

    if (oneButton) {
      classNamev = classNamev + " oneButton";
    }

    return classNamev;
  }, [isSecondary,oneButton]);

  return (
    <>
      <div className={getClassName()}  data-testid="button" onClick={() => onclick()}>
        {name}
      </div>
    </>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  isSecondary: PropTypes.bool.isRequired,
  onclick: PropTypes.func.isRequired,
  oneButton: PropTypes.bool.isRequired,
};

