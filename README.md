# Weather-Dashboard

- Firstly, Install this app using npm install
- create the .env file if not present 
- add these keys 
VITE_WEATHER_API_KEY = "ebbe1f25b2d684f7db85525415fe8a88"
VITE_JSON_SERVER_API = "http://localhost:3000"
VITE_OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?"

if you have the open weathermap api key you can use it by replacing in the .env file

- to run the app, npm run dev
- also run json-server, command is json-server db.json
## Using this app

- Using his app is pretty easy, when you run the app it will show the current location's weather.
- You can search for any city and it will display the results in a select component, the display component will show the weather details immediately, you can select different city that may be having the same name in different country.
- You can change the units to imperial to metric and vice versa.
- You can add the current displayed location to favorites and remove it using the same heart button.
- The favorites will be displayed and you can change the content from the display component from the weather dashboard too!.

