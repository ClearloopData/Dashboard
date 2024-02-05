import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

export const options = {
  sankey: {
    node: {
      interactivity: true,
    },
  },
};

export function SankeyDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    console.log(node);
    if (node[0] == "From" || node[0] == "To") {
      return;
    }
    setSelectedNode(node);
  };

  return (
    <Container>
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
              chart.container.addEventListener("click", (ev) =>
                console.log(ev)
              );
            },
          },
        ]}
      />
      <Modal show={selectedNode !== null} onHide={() => setSelectedNode(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Node Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNode && (
            <div>
              <p>From: {selectedNode[0]}</p>
              <p>To: {selectedNode[1]}</p>
              <p>Weight: {selectedNode[2]}</p>
            </div>
          )}
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
