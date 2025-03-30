const apiKey = "545d49923ad20e367d9769e581532b50";
        const cityInput = document.getElementById("cityInput");
        const suggestionsDiv = document.getElementById("suggestions");

        async function fetchCitySuggestions(query) {
            if (query.length < 3) {
                suggestionsDiv.innerHTML = "";
                return;
            }

            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
            const response = await fetch(url);
            const cities = await response.json();

            suggestionsDiv.innerHTML = "";

            cities.forEach(city => {
                const div = document.createElement("div");
                div.classList.add("suggestion");
                div.textContent = `${city.name}, ${city.country}`;
                div.onclick = () => {
                    cityInput.value = city.name;
                    suggestionsDiv.innerHTML = "";
                };
                suggestionsDiv.appendChild(div);
            });
        }

        async function fetchWeather() {
            const city = cityInput.value.trim();
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    document.getElementById("output").innerHTML = 
                        `City: ${data.name} <br><br> Temperature: ${data.main.temp}°C , Humidity: ${data.main.humidity}%`;
                } else {
                    document.getElementById("output").innerText = `Error: ${data.message}`;
                }
            } catch (error) {
                document.getElementById("output").innerText = "Failed to fetch weather data.";
            }
        }

        cityInput.addEventListener("input", () => fetchCitySuggestions(cityInput.value));