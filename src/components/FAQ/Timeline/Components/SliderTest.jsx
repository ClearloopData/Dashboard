import * as React from "react";
import Slider from "@mui/material/Slider";

export default function DiscreteSliderValues({ marks, onSliderChange }) {
  function valuetext(value) {
    return "";
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (
    <Slider
      aria-label="Restricted values"
      defaultValue={90}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      step={null}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={onSliderChange}
    />
  );
}
