import { useState, useRef } from "react";
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
        fontSize: 10,
        color: "#000", // Black
        bold: true,
        italic: false,
      },
      interactivity: false, // Allows you to not be able to select nodes (only select edges). False by default.
      labelPadding: 0,
      nodePadding: 20,
      width: 10,
      colors: ["#AEB3C4", "#100B32", "#F7E15D", "#FFFCD1"], // https://clearloop.design
    },
  },
};

export function SankeyDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2022-2023"); // Default year (current year)
  const indexRef = useRef(3);
  indexRef.current = parseInt(selectedYear.substring(0, 4)) - 2019;

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedNode(null);
    setSelectedDescription(null);
  };

  // No useEffect is necessary here since no data is being updated asynchronously. Instead, use the useRef
  // hook.
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
        data={data[indexRef.current]}
        options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              google.visualization.events.addListener(chart, "select", () => {
                /* This is selecting the corresponding data entry for the path selected. 1-indexed. */
                setSelectedNode(
                  data[indexRef.current][chart.getSelection()[0].row + 1]
                );
                setSelectedDescription(
                  descriptions[indexRef.current][chart.getSelection()[0].row]
                );
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
          {selectedNode === null
            ? ""
            : `${
                selectedDescription +
                " \n" +
                "This component contributes " +
                (2204 * selectedNode[2]).toLocaleString("en-us") +
                " lbs of CO2 to the University's carbon footprint."
              }`}
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
