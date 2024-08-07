import React from 'react';
import { Link } from 'react-router-dom';
import './ClickableImage.css';
import logo from "../static/images/all_project.png";


const DataImage = () => {
    return (
        
        <Link to="/data">
            <img src={logo} alt="Vandy Clearloop" className="data-image" />
        </Link>
    );
};

export default DataImage;
