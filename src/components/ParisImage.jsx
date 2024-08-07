import React from 'react';
import './ClickableImage.css';
import logo from "../static/images/paris_1.png";

const ParisImage = () => {
    return (
        <a href="https://clearloop.us/tn-paris/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Vandy Clearloop" className="data-image" />
        </a>
    );
};

export default ParisImage;
