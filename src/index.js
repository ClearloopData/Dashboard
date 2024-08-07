import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Data from "./components/Data/Data";
import VandyClearloop from "./components/vandy-clearloop";
import Resources from "./components/Resources/Resources";
import ImageCollection from "./components/ImageCollection";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/vandy-clearloop", // Existing route
    element: <VandyClearloop />,
  },
  {
    path: "/image-collection", // New route
    element: <ImageCollection />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
