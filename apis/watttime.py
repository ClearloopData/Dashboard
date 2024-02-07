# Code by Daniel Henricks

import os
from dotenv import load_dotenv, find_dotenv

import requests
from requests.auth import HTTPBasicAuth
login_url = 'https://api.watttime.org/login'
load_dotenv(find_dotenv())
PASSWORD = os.environ.get("WATTTIME_PASSWORD")
rsp = requests.get(login_url, auth=HTTPBasicAuth('DanielHenricks', PASSWORD))
TOKEN = rsp.json()['token']
url = "https://api.watttime.org/v3/signal-index"
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {
    "region": "TVA",
    "signal_type": "co2_moer"
}
response = requests.get(url, headers=headers, params=params)
response.raise_for_status()
print(response.json())
