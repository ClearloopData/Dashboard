import React, { useState } from "react";
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

  return (
    <Container>
      <h3 className="mainText">A visual of Vanderbilt's 2022-2023 emissions</h3>
      <h3 className="smallerText">
        Click on any of the paths to see more info.
      </h3>
      <Chart
        chartType="Sankey"
        width="100%"
        height="500px"
        data={data}
        options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              google.visualization.events.addListener(chart, "select", () => {
                setSelectedNode(data[chart.getSelection()[0].row + 1]);
                setSelectedDescription(
                  descriptions[chart.getSelection()[0].row]
                );
                console.log(chart.getSelection()[0].row);
                /* This is selecting the corresponding data entry for the path selected. 1-indexed. */
              });
            },
          },
        ]}
      />
      <Modal show={selectedNode !== null} onHide={() => setSelectedNode(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedNode === null
              ? ""
              : `${selectedNode[0]}: ${selectedNode[1]}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNode === null
            ? ""
            : `${selectedDescription} This source emits ${selectedNode[2]} metric tons of CO2.`}
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
