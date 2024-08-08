import React, { useEffect, useState, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useSpring, animated, config } from '@react-spring/web';
import mapInit from '../../static/images/clearloop-map-no-bg.png';
import usMapData from './USMap/us-states-cleaned.json'; // Adjust the path as needed
import * as d3 from 'd3-geo';
import Tooltip from './Tooltip'; // Import Tooltip
import cv_panola from '../../static/images/cv_panola.jpg';
import cv_brownsville from '../../static/images/cv_brownsville.png';

const locations = [
  {
    project: 'Project: Panola III',
    location: 'Location: Panola County, MS',
    schoolYear: 'School Year: 2021-2022',
    co2: 'Total CO2 Reclaimed: 128,058 tCO2',
    coordinates: [-89.987844, 34.302365],
    position: 'left',
    link: 'https://clearloop.us/2023/04/19/vanderbilt-to-further-offset-carbon-footprint-by-investing-in-solar-energy-projects-through-clearloop/',
    image: cv_panola
  },
  {
    project: 'Project: Brownsville',
    location: 'Location: Brownsville, TN',
    schoolYear: 'School Year: 2022-2023',
    co2: 'Total CO2 Reclaimed: 107,985 tCO2',
    coordinates: [-89.23283, 35.59013],
    position: 'right',
    link: 'https://clearloop.us/2024/04/22/vanderbilt-continues-carbon-neutral-collaboration-with-clearloop/',
    image: cv_brownsville
  }
];

function MapCollaboration() {
  const [showMap, setShowMap] = useState(false);
  // const [mapData, setMapData] = useState(null);
  const [usMapLoaded, setUsMapLoaded] = useState(false);
  const [tooltips, setTooltips] = useState([]);
  const mapRef = useRef(null);

  const projection = d3.geoAlbersUsa().scale(1000).translate([487.5, 305]);

  useEffect(() => {
    const loadMapData = () => {
      try {
        console.log('Loading map data from imported JSON');
        console.log('Map data:', usMapData);
        // setMapData(usMapData);
        setUsMapLoaded(true);
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };

    loadMapData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (usMapLoaded && locations.length > 0) {
      const newTooltips = locations.map((location, index) => {
        const [x, y] = projection(location.coordinates);
        return {
          coordinates: [x, y],
          project: location.project,
          location: location.location,
          schoolYear: location.schoolYear,
          co2: location.co2,
          position: location.position,
          link: location.link,
          image: location.image,
          key: `${location.project}-${index}` // Add unique key
        };
      });
      setTooltips(newTooltips);
    }
  }, [usMapLoaded]);

  const handleMarkerMouseEnter = (location) => {
    const [x, y] = projection(location.coordinates);
    setTooltips([...tooltips, {
      coordinates: [x, y],
      project: location.project,
      location: location.location,
      schoolYear: location.schoolYear,
      co2: location.co2,
      position: location.position,
      link: location.link,
      image: location.image,
      key: `${location.project}-${tooltips.length}` // Add unique key
    }]);
  };

  const handleMarkerMouseLeave = (name) => {
    setTooltips(tooltips.filter(tooltip => tooltip.project !== name));
  };

  // Define the spring animation for the image
  const imageProps = useSpring({
    from: { y: 0, opacity: 1 },
    to: async (next) => {
      await next({ y: -30, config: config.wobbly      });
      await next({ y: 0, config: config.wobbly });
      await next({ y: -30, config: config.wobbly });
      await next({ y: 0, config: config.wobbly });
      await next({ opacity: 0, config: { duration: 500 } });
    },
    config: { tension: 200, friction: 10 },
  });

  // Define the spring animation for the map
  const mapProps = useSpring({
    opacity: showMap ? 1 : 0,
    config: { duration: 1500 },
  });

  // Define the spring animation for the markers
  const markerProps = useSpring({
    from: { r: 3 },
    to: { r: 6 },
    config: { duration: 2000 },
    loop: true
  });

  return (
    <div style={{ textAlign: "center", margin: "20px 0", position: 'relative' }}>
      {!showMap && (
        <animated.img
          src={mapInit}
          alt="Clearloop Map"
          style={{
            ...imageProps,
            maxWidth: "100%",
            height: "auto",
            cursor: "pointer",
          }}
        />
      )}
      {usMapLoaded && showMap && (
        <animated.div ref={mapRef} style={{ ...mapProps, height: "auto", display: "flex", justifyContent: "center", position: 'relative' }}>
          <ComposableMap projection="geoAlbersUsa" style={{ maxWidth: "50%", height: "auto", marginTop: "-30px", marginBottom: "-20px" }}>
            <Geographies geography={usMapData}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#515287",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#515287",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#515287",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            {locations.map(location => (
              <Marker key={location.project} coordinates={location.coordinates}>
                <animated.circle
                  style={markerProps}
                  fill="#f7e160"
                  stroke="rgba(250, 192, 17, 0.5)"
                  strokeWidth={1.5}
                  onMouseEnter={() => handleMarkerMouseEnter(location)}
                  onMouseLeave={() => handleMarkerMouseLeave(location.project)}
                />
              </Marker>
            ))}
            {tooltips.map(tooltip => (
              <Tooltip
                key={tooltip.key} // Ensure unique key
                coordinates={tooltip.coordinates}
                project={tooltip.project}
                location={tooltip.location}
                schoolYear={tooltip.schoolYear}
                co2={tooltip.co2}
                position={tooltip.position}
                link={tooltip.link}
                image={tooltip.image}
              />
            ))}
          </ComposableMap>
        </animated.div>
      )}
    </div>
  );
}

export default MapCollaboration;
