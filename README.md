# Weather Forecast Application

## Description
This project is a web application that allows users to track the weather conditions of every city and there current location as well. This project allows the users to know the upcoming 5 days of weather forecast.

## Setup Instructions
1. Created index.html file and implemented the structure of the website.
2. Created index.js file and implemented the functionalities like:
    # Selected the suitable weather API provider #OpenWeatherMap for weather API key.
    # Added click eventlisteners to the buttons for getting the weather details of current location and city entered by the user.
    # Displayed all the weather data which got from API dynamically using javascript.
3. Styling of the application is done by installing Tailwind.css
4. Media Queries are written in a seperate CSS file and linked with the HTML file.

## Working
1. Input Element: User can enter any city as input.
2. Search City Weather button: Upon clicking of this button a function call is made where it takes the entered city and places it in the API key which we have from OpenWeatherMap website.
3. If the city name is valid then the temperature, wind speed, humidity of the specified city will be displayed for today and the next 5 days.
4. Search Current Location weather: Upon clicking on this button a function call is made where it gets the latitude and longitude of the current location and places it in the API key which we got from OpenWeatherMap website followed by displaying the temperature, wind speed, humidity of the specified city will be displayed for today and the next 5 days.
5. The user interface of the application gets adjusted for different screen sizes because of media queries. 