const input= document.getElementById('input');
const cityButton= document.getElementById('city-btn');
const currentButton= document.getElementById('current-btn');
const container= document.getElementById('container');
const forecastContainer= document.getElementById('forecast-container');
const recentCitiesDropdown= document.getElementById('recent-cities');

//API KEY
const apiKey= '881f06fb59f5cbc7b91ea804bc703774';

//display weather details
function displayWeather(data){
    container.innerHTML= `
    <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
        <h2 class= "text-2xl font-semibold mb-2 text-gray-800">${data.name}, ${data.sys.country}</h2>
        <p class="text-lg mb-1 text-gray-600">Temperature:<span class="font-semibold text-blue-700">${data.main.temp} C</span></p>
        <p class="text-lg mb-1 text-gray-600">Humidity:<span class="font-semibold text-blue-700">${data.main.humidity} %</span></p>
        <p class="text-lg mb-1 text-gray-600">Wind Speed:<span class="font-semibold text-blue-700">${data.wind.speed} m/s</span></p>
    </div>`
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
    forecastContainer.innerHTML= "";
    for(let i=0;i<data.list.length;i=i+8){
        const dayData= data.list[i];
        const date= formatDate(dayData.dt);
        const temp= dayData.main.temp;
        const description= dayData.weather[0].description;
        forecastContainer.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 border-b-2 border-blue-200 pb-2">${date}</h3>
            <p class="text-lg mb-1 text-gray-600 my-2">Temperature: <span class="font-semibold text-blue-700">${temp} C </span> </p>
            <p class="text-lg mb-1 text-gray-600 my-2 bg-gray-100 p-2 rounded-md">Humidity: <span class="font-semibold text-blue-700"> ${dayData.main.humidity} % </span> </p>
            <p class="text-lg mb-1 text-gray-600 my-2">Wind Speed: <span class="font-semibold text-blue-700"> ${dayData.wind.speed} m/s </span> </p>
            <p class="text-lg mb-1 text-gray-600 my-2 bg-gray-100 p-2 rounded-md capitalize">${description}</p>
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
        input.value="";
        displayWeather(weatherData);

        const forecastResponse= await fetch(forecastUrl);
        const forecastData= await forecastResponse.json();
        console.log(forecastData);
        displayForecast(forecastData);

        storeCity(city.toLowerCase());
        populateRecentCities();
        
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

function storeCity(city){
    let cities= JSON.parse(localStorage.getItem('recentCities'))||[];
    if(!cities.includes(city)){
        cities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(cities));
    }
}

function populateRecentCities(){
    let cities= JSON.parse(localStorage.getItem('recentCities'))||[];
    if(cities.length>0){
        recentCitiesDropdown.style.display='block';
        recentCitiesDropdown.innerHTML= `<option value="">Select a city</option>`;
        cities.forEach(city=>{
            let option = document.createElement('option');
            option.value= city;
            option.textContent= city;
            recentCitiesDropdown.appendChild(option);
        })
    }
    else{
        recentCitiesDropdown.style.display='none';
    }
}

recentCitiesDropdown.addEventListener('change', ()=>{
    if(recentCitiesDropdown.value){
        input.value= recentCitiesDropdown.value;
        cityWeather();
    }
})

cityButton.addEventListener('click', cityWeather);
currentButton.addEventListener('click', currentWeather);