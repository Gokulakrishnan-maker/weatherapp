const API = "5fc8dcf7d14d6dc94fc546de13294bda"
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const unitToggle = document.getElementById("unitToggle");

let currentUnit = "metric"; 

async function getWeather(city) {
    try {
        const cityEncoded = encodeURIComponent(city);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&appid=${API}&units=${currentUnit}`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("City not Found");
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const tempUnit = currentUnit === "metric" ? "°C" : "°F";
    const windSpeedUnit = currentUnit === "metric" ? "km/h" : "mph";

    document.getElementById("CityName").innerHTML = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp} ${tempUnit}`;
    document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById("description").innerHTML = `Weather: ${data.weather[0].description}`;
    document.getElementById("wind").innerHTML = `Wind Speed: ${data.wind.speed} ${windSpeedUnit}`;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

unitToggle.addEventListener("click", () => {
   
    currentUnit = currentUnit === "metric" ? "imperial" : "metric";

   
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});


