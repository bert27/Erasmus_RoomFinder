import React, { useCallback } from "react";
import "./Button.sass";
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
      <div className={getClassName()}  data-testid="button" onClick={(e) => onclick()}>
        {name}
      </div>
    </>
  );
};
