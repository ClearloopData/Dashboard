# Code by Daniel Henricks

import os
from dotenv import load_dotenv, find_dotenv

import requests
from requests.auth import HTTPBasicAuth
login_url = 'https://api.watttime.org/login'
load_dotenv(find_dotenv())
PASSWORD = os.environ.get("WATTTIME_PASSWORD")
rsp = requests.get(login_url, auth=HTTPBasicAuth('clearloop', PASSWORD))
TOKEN = rsp.json()['token']
url = "https://api.watttime.org/v3/historical"
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {
    "region": "CAISO_NORTH",
    "start": "2024-02-15T00:00+00:00",
    "end": "2024-02-15T00:05+00:00",
    "signal_type": "health_damage",
}
response = requests.get(url, headers=headers, params=params)
response.raise_for_status()
print(response.json())