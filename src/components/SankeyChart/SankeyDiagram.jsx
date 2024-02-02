import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["From", "To", "Weight"],
  ["Vanderbilt 2023 Emissions", "Scope 1 Emissions", 63021],
  ["Vanderbilt 2023 Emissions", "Scope 2 Emissions", 35855],
  ["Vanderbilt 2023 Emissions", "Scope 3 Emissions", 14947],
  ["Scope 1 Emissions", "Natural Gas", 61958],
  ["Scope 1 Emissions", "Other Energy Sources", 1063],
  ["Scope 2 Emissions", "Purchased Electricity", 35855],
  ["Scope 3 Emissions", "Waste Disposal and Recycling", 2551],
  ["Scope 3 Emissions", "Air Travel", 6942],
  ["Scope 3 Emissions", "Commuting", 5453],
];

export const options = {};

export function SankeyDiagram() {
  return (
    <Chart
      chartType="Sankey"
      width="75%"
      height="500px"
      data={data}
      options={options}
    />
  );
}
