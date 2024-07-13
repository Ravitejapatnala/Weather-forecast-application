const input= document.getElementById('input');
const button= document.getElementById('btn');
const container= document.getElementById('container');
const apiKey= '881f06fb59f5cbc7b91ea804bc703774';

function displayWeather(data){
    container.innerHTML= `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} C</p>
    <p>Humidity: ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>`
}

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

button.addEventListener('click', cityWeather);