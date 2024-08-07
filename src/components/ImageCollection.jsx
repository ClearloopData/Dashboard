import React from "react";
import ClickableImage from "./ClickableImage";
import NavComponent from "./Navbar";
import DataImage from "./DataImage";
import JacksonImage from "./JacksonImage";
import ParisImage from "./ParisImage";
import "./ImageCollection.css"
import WhitepineImage from "./WhitepineImage";

function ImageCollection() {
    return (
        <div>
            <NavComponent />
    <div className="image-collection">
        
        <div>
        <h3>Vandy Clearloop</h3>
        <ClickableImage />
        </div>
        <div>
        <h3>Data & Project: How it work</h3>
        <DataImage />
        </div>
        <div>
        <h3>Jackson Project</h3>
        <JacksonImage />
        </div>
        <div>
        <h3>Paris Project</h3>
        <ParisImage />
        </div>
        <div>
        <h3>White Pine Project</h3>
        <WhitepineImage />
        </div>
    </div>
    </div>
    );
    
}

export default ImageCollection;