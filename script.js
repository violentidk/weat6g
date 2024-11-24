const apiKey = "9b74006f20034bab863123522242411"; // Add your WeatherAPI key here.

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
        );

        if (!response.ok) {
            throw new Error(`Error fetching weather for ${location}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function displayWeather(data, container) {
    if (!data) {
        container.querySelector(".temperature").textContent = "Error";
        container.querySelector(".description").textContent = "Unable to load data";
        return;
    }

    const current = data.current;
    container.querySelector(".temperature").textContent = `${Math.round(current.temp_c)}°C`;
    container.querySelector(".description").textContent = current.condition.text;

    const icon = container.querySelector(".weather-icon");
    icon.src = `https:${current.condition.icon}`;
    icon.alt = current.condition.text;
}

async function updateWeather() {
    const weatherBoxes = document.querySelectorAll(".weather-box");

    for (const box of weatherBoxes) {
        const location = box.getAttribute("data-location");
        const data = await fetchWeather(location);
        displayWeather(data, box);
    }
}

updateWeather();

