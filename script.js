const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

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
            localTime: data.location.localtime,
        };
    } catch (error) {
        console.error(`Error fetching data for ${location}:`, error);
        return null;
    }
}

async function updateWeather() {
    const widgets = document.querySelectorAll(".weather-box");
    for (const widget of widgets) {
        const location = widget.getAttribute("data-location");
        const data = await fetchWeather(location);

        if (data) {
            widget.querySelector(".temperature").textContent = `${Math.round(data.tempC)}°C / ${Math.round(data.tempF)}°F`;
            widget.querySelector(".description").textContent = data.condition;
            widget.querySelector(".local-time").textContent = `Local Time: ${data.localTime}`;
        } else {
            widget.querySelector(".temperature").textContent = "N/A";
            widget.querySelector(".description").textContent = "Error loading data";
            widget.querySelector(".local-time").textContent = "N/A";
        }
    }
}

updateWeather();
