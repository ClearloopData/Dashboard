import React from 'react';
import './ClickableImage.css';
import logo from "../static/images/clearloop-logo-dark-bg.png";

const DarkLogo = () => {
    return (
        <a href="https://clearloop.us/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Vandy Clearloop" className="logo-image" />
        </a>
    );
};

export default DarkLogo;
