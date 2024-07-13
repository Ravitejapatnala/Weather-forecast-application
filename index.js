const input= document.getElementById('input');
const cityButton= document.getElementById('city-btn');
const currentButton= document.getElementById('current-btn');
const container= document.getElementById('container');
const apiKey= '881f06fb59f5cbc7b91ea804bc703774';

//display weather details
function displayWeather(data){
    container.innerHTML= `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} C</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>`
}

//city weather
async function cityWeather(){
    let city= input.value;
    if(city===""){
        alert('Please enter city name')
        return;
    }

    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response= await fetch(url);
        const data= await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.log(error);
    }

}

//current weather
async function currentWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position)=>{
            const lat= position.coords.latitude;
            const lon= position.coords.longitude;
            const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

            try {
                const response= await fetch(url);
                const data= await response.json();
                displayWeather(data);
            } catch (error) {
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