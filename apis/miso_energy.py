# Code by Daniel Henricks for Clearloop.
# This script gets the most recent LMP Consolidated data from the MISO API.
# The structure of the data per row is as follows:
# 1) The time of day (EST) that the data is retrieved.
# 2) The LMP (Locational Marginal Pricing) of the current region.
# 3) The MLC (Marginal Loss Component)
# 4) The MCC (Marginal Cost Component)

import requests
import firebase_admin
from firebase_admin import db

cred_obj = firebase_admin.credentials.Certificate('src/firebase/database_config.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': "https://clearloop-miso-data-default-rtdb.firebaseio.com"
})
ref = db.reference("/five_min_data")
# No API key required.
url = "https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getlmpconsolidatedtable&returnType=json"
res = requests.get(url)
data = res.json()["LMPData"]["FiveMinLMP"]["PricingNode"]
request_date = res.json()["LMPData"]["FiveMinLMP"]["HourAndMin"]
region_list = [] # If we want to select more than one region
region_data = [] 
louisiana_hub_data = [entry for entry in data if entry.get("name") == "LOUISIANA.HUB"]
arkansas_hub_data = [entry for entry in data if entry.get("name") == "ARKANSAS.HUB"]
formatted_data = {
    'request_date': request_date,
    'arkansas_data': arkansas_hub_data,
    'louisiana_data': louisiana_hub_data
}
ref.push(formatted_data) # Append this to the firebase db.