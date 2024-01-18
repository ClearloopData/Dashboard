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
    if (token.value === "" || Date.now() - token.accessDate >= 1000 * 60 * 30) {
      // If the token does not exist or has expired, get a new one.
      await login();
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    };

    // The latitude and longitude of Nashville, TN.
    let params = {
      latitude: "32.7762719",
      longitude: "-96.7968559",
      signal_type: "co2_moer",
    };

    await axios
      .get("https://api.watttime.org/v3/region-from-loc", { headers, params })
      .then((response) => {
        setRegionName(response.data.region);
        setFullRegionName(response.data.region_full_name);
      });
  }

  /**
   * Gets the most recently generated forecast for the given region and signal_type.
   */
  async function getGeneratedForecast() {
    await login();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    };

    const params = {
      startTime: "2022-07-15T00:00+00:00",
      endTime: "2022-07-15T00:05+00:00",
    };
    var url = `https://api2.watttime.org/v2/data/?ba=CAISO_ZP26&starttime=${params["startTime"]}&endtime=${params["endTime"]}&style=all&moerversion=2.1`;
    return await axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={getRegion}>Get Region</button>
      <button onClick={getGeneratedForecast}>Get Generated Forecast</button>
      <h3>{regionName}</h3>
      <h4>{fullRegionName}</h4>
    </div>
  );
};

export default Caller;
