import React from 'react';
import './Tooltip.css';

const Tooltip = ({ coordinates, project, location, schoolYear, co2, image, position, link }) => {
  const rectWidth = 200;
  const rectHeight = 220; // Adjust height to 220px to accommodate image
  const xOffset = position === 'left' ? -rectWidth : 10; // Adjust for left and right positions
  const rectX = position === 'left' ? -20 : 0; // Adjust x position for left
  const yOffset = -15; // Adjust vertical position as needed

  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <g
      transform={`translate(${coordinates[0] - 75 + xOffset}, ${coordinates[1] + 20 + yOffset})`}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <rect x={rectX} y="-20" width={rectWidth} height={rectHeight} fill="white" rx="5" ry="5" opacity="0.9" filter="url(#shadow)" />
      <polygon points="0,10 -10,0 10,0" fill="white" opacity="0.9" transform={`translate(${position === 'left' ? rectWidth-20 : 0}, -5) rotate(${position === 'left' ? -90 : 90})`} />
      <text x={rectWidth / 2 + rectX} y="0" textAnchor="middle" fill="black" fontSize="12px" opacity="0.9">
        {project}
      </text>
      <text x={rectWidth / 2 + rectX} y="20" textAnchor="middle" fill="black" fontSize="11px" opacity="0.9">
        {location}
      </text>
      <text x={rectWidth / 2 + rectX} y="40" textAnchor="middle" fill="black" fontSize="11px" opacity="0.9">
        {schoolYear}
      </text>
      <text x={rectWidth / 2 + rectX} y="60" textAnchor="middle" fill="black" fontSize="11px" opacity="0.9">
        {co2}
      </text>
      <image href={image} x={rectX-25} y="80" height="110px" width="250px" />
    </g>
  );
};

export default Tooltip;
