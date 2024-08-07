import React from 'react';
import './ClickableImage.css';
import logo from "../static/images/jackson_1.png";

const JacksonImage = () => {
    return (
        <a href="https://clearloop.us/tn-jackson/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Vandy Clearloop" className="data-image" />
        </a>
    );
};

export default JacksonImage;
