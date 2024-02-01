# Code by Daniel Henricks for Clearloop.
# This script gets the most recent LMP Consolidated data from the MISO API 
# for the Arkansas and Louisiana regions.
# The structure of the data pushed to Firebase is as follows:
# [request_time]: The time of day (EST) that the data is retrieved. Updates every 5 minutes. 
# [request_date]: The day that the data was retrieved. In YYYY-MM-DD format.
# [arkansas_data]: A dict that contains: 
#   1) LMP (The locational marginal pricing.)
#   2) MCC (The marginal congestion component.)
#   3) MLC (The marginal loss at a node; the cost of transmission losses. Should be relatively small.)
# [louisiana_data]: A dict with the same structure as the arkansas_data dict.

import requests
import firebase_admin
from firebase_admin import db
from datetime import date

# The following is used by AWS Lambda.
def lambda_handler(event, context):
    if not firebase_admin._apps: # Check if the app is initialized. 
        cred_obj = firebase_admin.credentials.Certificate('database_config.json')
        default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL': "https://clearloop-miso-data-default-rtdb.firebaseio.com"
        }) 
    ref = db.reference("/five_min_data")
    # No API key required.
    url = "https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getlmpconsolidatedtable&returnType=json"
    res = requests.get(url)
    data = res.json()["LMPData"]["FiveMinLMP"]["PricingNode"]
    request_time = res.json()["LMPData"]["FiveMinLMP"]["HourAndMin"]
    louisiana_hub_data = [entry for entry in data if entry.get("name") == "LOUISIANA.HUB"]
    arkansas_hub_data = [entry for entry in data if entry.get("name") == "ARKANSAS.HUB"]
    request_date = date.today().strftime("%Y-%m-%d"), # Ex: 2024-02-01 for Feb 1st, 2024
    formatted_data = {
        'request_date': request_date,
        'request_time': request_time,
        'arkansas_data': arkansas_hub_data,
        'louisiana_data': louisiana_hub_data
    }
    ref.push(formatted_data) # Append this to the firebase db.
   
    return {
        'statusCode': 200,
        'body': 'Data successfully pushed to Firebase!'
    } # Tell AWS Lambda that our code worked successfully!