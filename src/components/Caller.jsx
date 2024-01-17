import React, { useState } from "react";
import axios from "axios";

const Caller = () => {
  let token = {
    value: "",
    accessDate: 0,
  };

  let [regionName, setRegionName] = useState("");
  let [fullRegionName, setFullRegionName] = useState("");

  async function login() {
    return await axios
      .get("https://api.watttime.org/login", {
        auth: {
          // Use HTTP Basic Auth with the username and password already set up.
          username: "DanielHenricks",
          password: "Dan1el!!",
        },
      })
      .then((response) => {
        token = {
          value: response.data.token,
          accessDate: Date.now(),
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /**
   * Gets the region of the provided latitude and longitude.
   * @return The region (abbreviated and full name) at the current latitude and longitude.
   */
  async function getRegion() {
    if (token.value == "" || Date.now() - token.accessDate >= 1000 * 60 * 30) {
      // If the token does not exist or has expired, get a new one.
      await login();
    }
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    };

    // The latitude and longitude of Nashville, TN.
    let params = {
      latitude: "36.162663",
      longitude: "-86.781601",
      signal_type: "co2_moer",
    };

    await axios
      .get("https://api.watttime.org/v3/region-from-loc", { headers, params })
      .then((response) => {
        setRegionName(response.data.region);
        setFullRegionName(response.data.region_full_name);
      });
  }

  return (
    <div>
      <button onClick={getRegion}>Get Region</button>
      <h3>{regionName}</h3>
      <h4>{fullRegionName}</h4>
    </div>
  );
};

export default Caller;
