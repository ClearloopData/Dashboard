import { useState, useRef, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { data, descriptions } from "./data";
import './styles.css'; // Make sure to import your CSS file

export const options = {
  sankey: {
    link: {
      interactivity: true,
      colorMode: 'gradient',
      colors: ['#100b32', '#aeb3c4', '#f7e15d', '#FFFCD1'],
    },
    node: {
      label: {
        fontSize: 10,
        color: "#000",
        bold: true,
        italic: false,
      },
      interactivity: false,
      labelPadding: 0,
      nodePadding: 20,
      width: 10,
      colors: ["#100B32", "#AEB3C4", "#F7E15D", "#FFFCD1"],
    },
    tooltip: {
      isHtml: true, // Enable HTML tooltips
    },
  },
};

export function SankeyDiagram() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2022-2023");
  const [isAutoSwitching, setIsAutoSwitching] = useState(true); // New state to track auto-switching
  const indexRef = useRef(3);
  indexRef.current = parseInt(selectedYear.substring(0, 4)) - 2019;

  const years = ["2019-2020", "2020-2021", "2021-2022", "2022-2023"];

  useEffect(() => {
    const applyLinkStyles = () => {
      const links = document.querySelectorAll('path[sankey-link]');
      links.forEach(link => {
        link.classList.add('sankey-link');
      });
    };

    // Apply styles after a delay to ensure the chart has been rendered
    setTimeout(applyLinkStyles, 1000);
  }, [selectedYear]);

  useEffect(() => {
    const switchYearAutomatically = () => {
      const currentIndex = years.indexOf(selectedYear);
      const nextIndex = (currentIndex + 1) % years.length;
      setSelectedYear(years[nextIndex]);
    };

    let interval;
    if (isAutoSwitching) {
      interval = setInterval(switchYearAutomatically, 10000); // Switch every 10 seconds
    }

    return () => clearInterval(interval); // Clear interval on unmount
  }, [selectedYear, isAutoSwitching]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedNode(null);
    setSelectedDescription(null);
    setIsAutoSwitching(false); // Stop auto-switching when a button is clicked
  };

  const calculateTotalWeightPerLayer = (data) => {
    const layerWeights = {};
    data.slice(1).forEach(row => {
      if (!layerWeights[row[0]]) {
        layerWeights[row[0]] = 0;
      }
      layerWeights[row[0]] += row[2];
    });
    return layerWeights;
  };

  const addTooltipData = (data) => {
    const totalWeightPerLayer = calculateTotalWeightPerLayer(data);
    return data.map((row, index) => {
      if (index === 0) {
        // Add column header for tooltip
        return [...row, { role: 'tooltip', type: 'string', p: { html: true } }];
      } else {
        const weight = row[2];
        const totalWeight = totalWeightPerLayer[row[0]];
        const percentage = ((weight / totalWeight) * 100).toFixed(2);
        const tooltip = `${row[1]} takes ${percentage}% in ${row[0]}`;
        return [...row, tooltip];
      }
    });
  };

  const modifiedData = addTooltipData(data[indexRef.current]);

  return (
    <Container>
      <h3 className="mainText">
        Tracking Vanderbilt's Historical Carbon Emissions: {selectedYear}
      </h3>
      <div>
        {years.map((year, idx) => (
          <Button
            key={year}
            variant={selectedYear === year ? "primary" : "secondary"}
            onClick={() => handleYearChange(year)}
            className={`sankey-button ${selectedYear === year ? 'highlighted' : ''}`}
          >
            {year}
          </Button>
        ))}
      </div>

      <Chart
        chartType="Sankey"
        width="100%"
        height="500px"
        data={modifiedData}
        options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              google.visualization.events.addListener(chart, "select", () => {
                const selection = chart.getSelection()[0];
                const selectedRow = data[indexRef.current][selection.row + 1];
                const weight = selectedRow[2];
                const totalWeightPerLayer = calculateTotalWeightPerLayer(data[indexRef.current]);
                const totalWeight = totalWeightPerLayer[selectedRow[0]];
                const percentage = ((weight / totalWeight) * 100).toFixed(2);
                const description = descriptions[indexRef.current][selection.row];

                setSelectedNode(selectedRow);
                // Set the description without percentage
                setSelectedDescription(`${description} \nThis component contributes ${(2204 * weight).toLocaleString("en-us")} lbs of CO2 to the University's carbon footprint.`);
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
          {selectedNode === null ? "" : selectedDescription}
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
