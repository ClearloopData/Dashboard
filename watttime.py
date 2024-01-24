# Code by Daniel Henricks

import requests
from requests.auth import HTTPBasicAuth
login_url = 'https://api.watttime.org/login'
rsp = requests.get(login_url, auth=HTTPBasicAuth('DanielHenricks', 'Dan1el!!'))
TOKEN = rsp.json()['token']



url = "https://api.watttime.org/v3/forecast"

# Provide your TOKEN here, see https://docs.watttime.org/#tag/Authentication/operation/get_token_login_get for more information
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {
    "region": "CAISO_NORTH",
    "signal_type": "health_damage",
}
response = requests.get(url, headers=headers, params=params)
response.raise_for_status()
print(response.json())


