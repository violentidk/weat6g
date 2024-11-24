const apiKey = "df8ac744474a42ad888200038242411"; // Replace with your actual API key

// Function to fetch weather data for a specific location
async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching weather for ${location}:`, error);
        return null;
    }
}

// Function to update the weather widget for a single location
async function updateWeather() {
    const widgets = document.querySelectorAll(".weather-box");
    for (const widget of widgets) {
        const location = widget.getAttribute("data-location");
        const data = await fetchWeather(location);

        if (data) {
            // Update weather details if data is fetched successfully
            widget.querySelector(".temperature").textContent = `${Math.round(data.current.temp_c)}°C`;
            widget.querySelector(".description").textContent = data.current.condition.text;

            const icon = widget.querySelector(".weather-icon");
            icon.src = `https:${data.current.condition.icon}`;
            icon.alt = data.current.condition.text;
        } else {
            // Display error message if fetch fails
            widget.querySelector(".temperature").textContent = "N/A";
            widget.querySelector(".description").textContent = "Error loading data";
        }
    }
}

// Call the function to load weather data
updateWeather();
