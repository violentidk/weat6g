const apiKey = "df8ac744474a42ad888200038242411"; // Replace with your actual API key

async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        console.log(`Fetched weather for ${location}:`, data);
        return {
            tempC: data.current.temp_c,
            tempF: data.current.temp_f,
            condition: data.current.condition.text,
            conditionIcon: data.current.condition.icon,
            backgroundColor: getWeatherBackground(data.current.condition.code),
        };
    } catch (error) {
        console.error(`Error fetching data for ${location}:`, error);
        return null;
    }
}

function getWeatherBackground(conditionCode) {
    // Map condition codes to background colors
    if (conditionCode < 1000) return "#9ec9ff"; // Clear/Cloudy
    if (conditionCode >= 1003 && conditionCode <= 1240) return "#a1c4fd"; // Rainy
    if (conditionCode >= 1243 && conditionCode <= 1276) return "#667db6"; // Thunderstorms
    return "#d3d3d3"; // Default/Other conditions
}

async function updateWeather() {
    const widgets = document.querySelectorAll(".weather-box");
    for (const widget of widgets) {
        const location = widget.getAttribute("data-location");
        const data = await fetchWeather(location);

        if (data) {
            widget.style.background = data.backgroundColor;
            widget.querySelector(".temperature").textContent = `${Math.round(data.tempC)}°C / ${Math.round(data.tempF)}°F`;
            widget.querySelector(".description").textContent = data.condition;
        } else {
            widget.querySelector(".temperature").textContent = "N/A";
            widget.querySelector(".description").textContent = "Error loading data";
            widget.style.background = "#d3d3d3";
        }
    }
}

updateWeather();
