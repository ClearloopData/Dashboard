API_KEY = 'Y2yCBCC2AKlkinwEAzBKjlCMDBH0q1wFiSurzk8E'
import requests
import csv
with open('apis/data/PVWatts.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for i in range(2):
        row = next(reader, None)
        lat = row[0]
        long = row[1]
        params = {
            "format": "json",
            "api_key": API_KEY,
            "system_capacity": 4,
            "module_type": 0,
            "losses": 0,
            "array_type": 0,
            "tilt": 45,
            "azimuth": 180,
            "lat": lat,
            "lon": long
        }
        url = 'https://developer.nrel.gov/api/pvwatts/v8.json'
        
        response = requests.get(url, params=params)
        print(response.json()["outputs"]["ac_annual"])
      