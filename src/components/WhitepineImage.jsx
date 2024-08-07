import React from 'react';
import './ClickableImage.css';
import logo from "../static/images/whitepine_1.png";

const WhitepineImage = () => {
    return (
        <a href="https://clearloop.us/tn-white-pine/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Vandy Clearloop" className="whitepine-image" />
        </a>
    );
};

export default WhitepineImage;
