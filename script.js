const apiKey = "df8ac744474a42ad888200038242411"; // Replace with your actual API key

async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        console.log(`Fetched weather for ${location}:`, data);
        return data;
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
            widget.querySelector(".temperature").textContent = `${Math.round(data.current.temp_c)}°C`;
            widget.querySelector(".description").textContent = data.current.condition.text;

            const icon = widget.querySelector(".weather-icon");
            icon.src = `https:${data.current.condition.icon}`;
            icon.alt = data.current.condition.text;
        } else {
            widget.querySelector(".temperature").textContent = "N/A";
            widget.querySelector(".description").textContent = "Error loading data";
        }
    }
}

updateWeather();
