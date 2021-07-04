import React, { useEffect, useState, useCallback } from "react";
//import Dropdown from "react-dropdown";
import "./Dropdown.sass";
import Select from "react-select";
//import "react-dropdown/style.css";

export const DropdownC = (props) => {
  const { options, OnoptionChoose, flag } = props;

  const [selectedOption, setselectedOption] = useState(undefined);
 

  //if change city reset others dropdowns
  useEffect(() => {
    setselectedOption(options[0]);
  }, [flag]);

  const onChange = useCallback(
    (option) => {
      setselectedOption({
        value: option.value,
        label: option.label,
      });
      OnoptionChoose(option);
    },
    [props,selectedOption]
  );

  const colourStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);

      if (isSelected) {
        return {
          ...styles,
          backgroundColor: isSelected ? "#3E8F32" : null,
          color: isSelected ? "white" : "#333333",
          cursor: isDisabled ? "not-allowed" : "pointer",
        };
      } else {
        return {
          ...styles,
          backgroundColor: isFocused ? "#c3e2bf" : null,
          color: "black",
          cursor: isDisabled ? "not-allowed" : "pointer",
        };
      }
    },
  };

  const getSelectTheme = (theme) => {
    return {
      primary25: "#3E8F32",
      primary50: "#3E8F32",
      primary75: "#3E8F32",
      danger: "#DE350B",
      dangerLight: "#FFBDAD",

      neutral0: "hsl(0, 0%, 100%)",
      neutral5: "hsl(0, 0%, 95%)",
      neutral10: "hsl(0, 0%, 90%)",
      neutral20: "hsl(0, 0%, 80%)",
      neutral30: "hsl(0, 0%, 70%)",
      neutral40: "hsl(0, 0%, 60%)",
      neutral50: "hsl(0, 0%, 50%)",
      neutral60: "hsl(0, 0%, 40%)",
      neutral70: "hsl(0, 0%, 30%)",
      neutral80: "hsl(0, 0%, 20%)",
      neutral90: "hsl(0, 0%, 10%)",
    };
  };

  const formThemeColors = getSelectTheme();

  return (
    <>
      <Select
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...formThemeColors,
          },
        })}
        menuPortalTarget={document.body}
        //Fix z index
    
        options={options}
        value={selectedOption}
        onChange={onChange}
        disabled={false}
        changestyles={true}
        className={"reactSelect"}
        classNamePrefix={"my-custom-react-select"}
        isSearchable={false}
        {...props}
        inputProps={{ readOnly: true }}
     
      />
    </>
  );
};
