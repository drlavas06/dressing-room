import { Slider } from "@mui/material";
import React, { useState } from "react";
import styles from "./CustomeSlider.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { getInchToFeetInch, getInchToFeetInchString, getSliderDisplayValue } from "./utils/sliderDisplayValue";

const styleOverride = {
  color: "#000",
  padding: "5px 0",
  "& .MuiSlider-sizeMedium": {
    "& .coarse": {
      padding: "0px",
    },
  },
  "& .MuiSlider-thumb": {
    borderRadius: "100%",
    height: 10,
    width: 10,
    boxShadow: "0 !important",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    },
  },
  "& .MuiSlider-rail": {
    color: "#ddd",
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 10,
    fontWeight: "500",
    top: 30,
    backgroundColor: "white",
    borderRadius: 2,
    fontFamily: "Montserrat",
    padding: "0px 10px",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
};

function CustomeSlider({
  name,
  title,
  displayMax,
  displayMin,
  hoverHandler,
  min = 0,
  max = 100,
  unitDivider,
  setUnit,
  shouldShowUnitSelector = false,
}) {
  const [{ modelProp, size }, dispatch] = useStateProviderValue();
  const displayMinUnit = Math.round(displayMin[size] / unitDivider);
  const displayMaxUnit = Math.round(displayMax[size] / unitDivider);

  const toggleUnit = () => {
    if (unitDivider === 1) {
      setUnit("in");
    } else {
      setUnit("cm");
    }
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputGroupTitle}>
        <span className={styles.inputLable}>{title}: </span>
        {shouldShowUnitSelector && (
          <span className={styles.unitSelector} onClick={toggleUnit}>
            {unitDivider === 1 ? "Switch to Inch" : "Switch to CM"}
          </span>
        )}
      </div>
      <Slider
        sx={styleOverride}
        color="primary"
        onChange={(e) =>
          dispatch({ type: "SET_MODEL_PROP", [name]: e.target.value })
        }
        valueLabelDisplay="on"
        min={min}
        max={max}
        onPointerDown={hoverHandler}
        valueLabelFormat={(value) =>
          getSliderDisplayValue(
            min,
            max,
            displayMinUnit,
            displayMaxUnit,
            value,
            name,
            unitDivider === 1 ? "cm" : "in"
          )
        }
        onChangeCommitted={() => {
          dispatch({ type: "SET_VIEWPORT", viewPort: "home" });
        }}
        value={modelProp[name]}
      />
      <div className={styles.labelsContainer}>
        <small className={styles.label}>{name==="height" && unitDivider!==1?getInchToFeetInchString(displayMinUnit):displayMinUnit}</small>
        <small className={styles.label}>{name==="height" && unitDivider!==1?getInchToFeetInchString(displayMaxUnit):displayMaxUnit}</small>
      </div>
    </div>
  );
}

export default CustomeSlider;
