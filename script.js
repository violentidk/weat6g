
const apiKey = "9b74006f20034bab863123522242411"; // Add your WeatherAPI key here.
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Tallinn&aqi=no`
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Stockholm&aqi=no`
        );

        if (!response.ok) {
            throw new Error(`Error fetching weather: ${response.statusText}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error loading weather data:", error);
        locationElement.textContent = "Error loading data";
        temperatureElement.textContent = "";
        descriptionElement.textContent = error.message;
    }
}

function displayWeather(data) {
    const current = data.current;
    locationElement.textContent = "Tallinn";
    temperatureElement.textContent = `${Math.round(current.temp_c)}°C`;
    descriptionElement.textContent = current.condition.text;

    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
}

fetchWeather();
