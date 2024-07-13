const input= document.getElementById('input');
const cityButton= document.getElementById('city-btn');
const currentButton= document.getElementById('current-btn');
const container= document.getElementById('container');
const apiKey= '881f06fb59f5cbc7b91ea804bc703774';
const forecastContainer= document.getElementById('forecast-container');

//display weather details
function displayWeather(data){
    container.innerHTML= `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} C</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>`
}

//function to format date
function formatDate(timestamp){
    const date= new Date(timestamp * 1000);
    const day= date.getDate();
    const month= date.getMonth()+1;
    const year= date.getFullYear();
    return `${day}/${month}/${year}`;
}

//display 5 day forecast
function displayForecast(data){
    forecastContainer.innerHTML= `<h2>5-Day Forecast:</h2>`;
    for(let i=0;i<data.list.length;i=i+8){
        const dayData= data.list[i];
        const date= formatDate(dayData.dt);
        const temp= dayData.main.temp;
        const description= dayData.weather[0].description;
        forecastContainer.innerHTML += `
        <div>
            <h3>${date}</h3>
            <p>Temperature: ${temp} C</p>
            <p>Humidity: ${dayData.main.humidity}</p>
            <p>Wind Speed: ${dayData.wind.speed}</p>
            <p>${description}</p>
        </div>`
    }
}

//city weather
async function cityWeather(){
    let city= input.value;
    if(city===""){
        alert('Please enter city name')
        return;
    }

    const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


    try {
        const weatherResponse= await fetch(weatherUrl);
        const weatherData= await weatherResponse.json();
        console.log(weatherData);
        displayWeather(weatherData);

        const forecastResponse= await fetch(forecastUrl);
        const forecastData= await forecastResponse.json();
        console.log(forecastData);
        displayForecast(forecastData);
    } catch (error) {
        container.innerHTML= `Error Finding City Weather: ${error}`
        console.log(error);
    }

}

//current weather
async function currentWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position)=>{
            const lat= position.coords.latitude;
            const lon= position.coords.longitude;
            const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const weatherResponse= await fetch(weatherUrl);
                const weatherData= await weatherResponse.json();
                console.log(weatherData);
                displayWeather(weatherData);

                const forecastResponse= await fetch(forecastUrl);
                const forecastData= await forecastResponse.json();
                console.log(forecastData);
                displayForecast(forecastData);
            } catch (error) {
                forecastContainer.innerHTML= `Error Finding City Weather: ${error}`
                console.log(error);
            }
        })
    }
    else{
        alert('Geo Location is not supported in this browser.');
    }
}

cityButton.addEventListener('click', cityWeather);
currentButton.addEventListener('click', currentWeather);