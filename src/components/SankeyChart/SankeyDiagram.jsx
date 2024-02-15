import React, { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { data, descriptions } from "./data";

export const options = {
  sankey: {
    // To specify that these options apply to the Sankey graph
    link: {
      interactivity: true, // Allows you to be able to select links (which we want).
    },
    node: {
      label: {
        fontSize: 12,
        color: "#000", // Black
        bold: true,
        italic: false,
      },
      interactivity: false, // Allows you to not be able to select nodes (only select edges) False by default.
      labelPadding: 6,
      nodePadding: 10,
      width: 5,
      colors: ["#AEB3C4", "#100B32", "#F7E15D", "#FFFCD1"], // https://clearloop.design
    },
  },
};

export function SankeyDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2022-2023"); // Default year (current year)
  const [index, setIndex] = useState(1); // The 6th (0-indexed) year with emissions reported. TODO

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedNode(null);
    setSelectedDescription(null);
  };

  useEffect(() => {
    // Update the index whenever selectedYear changes
    setIndex(parseInt(selectedYear.substring(0, 4)) - 2019);
  }, [selectedYear]);

  return (
    <Container>
      <h3 className="mainText">
        A visual of Vanderbilt's {selectedYear} emissions
      </h3>
      <h3 className="smallerText">
        Click on any of the paths to see more info. Select a year to see that
        year's emissions.
      </h3>
      <div>
        {/* Buttons for all of the years that emissions have been tracked at Vanderbilt */}
        <Button
          variant={selectedYear === "2019-2020" ? "primary" : "secondary"}
          onClick={() => handleYearChange("2019-2020")}
        >
          2019-2020
        </Button>{" "}
        {/* Add similar buttons for other years */}
        <Button
          variant={selectedYear === "2020-2021" ? "primary" : "secondary"}
          onClick={() => handleYearChange("2020-2021")}
        >
          2020-2021
        </Button>{" "}
        <Button
          variant={selectedYear === "2021-2022" ? "primary" : "secondary"}
          onClick={() => handleYearChange("2021-2022")}
        >
          2021-2022
        </Button>{" "}
        {/* Add similar buttons for other years */}
        <Button
          variant={selectedYear === "2022-2023" ? "primary" : "secondary"}
          onClick={() => handleYearChange("2022-2023")}
        >
          2022-2023
        </Button>
      </div>

      <Chart
        chartType="Sankey"
        width="100%"
        height="500px"
        data={data[index]}
        options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              google.visualization.events.addListener(chart, "select", () => {
                setSelectedNode(data[index][chart.getSelection()[0].row + 1]);
                setSelectedDescription(
                  descriptions[chart.getSelection()[0].row]
                );
                /* This is selecting the corresponding data entry for the path selected. 1-indexed. */
              });
            },
          },
        ]}
      />
      <Modal show={selectedNode !== null} onHide={() => setSelectedNode(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedNode === null ? "" : `${selectedNode[1]}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNode === null ? "" : `${selectedDescription}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedNode(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
