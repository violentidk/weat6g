const apiKey = "df8ac744474a42ad888200038242411"; // Replace with your actual API key 

async function fetchWeather(location, useFahrenheit = false) {
    const unit = useFahrenheit ? "f" : "c";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        console.log(`Fetched weather for ${location}:`, data);
        return {
            temp: useFahrenheit ? data.current.temp_f : data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
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
        const useFahrenheit = location === "Shiloh, PA"; // Use Fahrenheit for Shiloh, PA
        const data = await fetchWeather(location, useFahrenheit);

        if (data) {
            widget.querySelector(".temperature").textContent = `${Math.round(data.temp)}°${useFahrenheit ? "F" : "C"}`;
            widget.querySelector(".description").textContent = data.condition;

            const icon = widget.querySelector(".weather-icon");
            icon.src = `https:${data.icon}`;
            icon.alt = data.condition;
        } else {
            widget.querySelector(".temperature").textContent = "N/A";
            widget.querySelector(".description").textContent = "Error loading data";
        }
    }
}

updateWeather();
