import React from 'react';
import { Link } from 'react-router-dom';
import './ClickableImage.css';
import logo from "../static/images/long-logo.png";


const ClickableImage = () => {
    return (
        
        <Link to="/vandy-clearloop">
            <img src={logo} alt="Vandy Clearloop" className="clickable-image" />
        </Link>
    );
};

export default ClickableImage;
