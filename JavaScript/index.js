// API key and URL for OpenWeatherMap API
const api_key = "6726f77719cd5cfa0432e489b1128df0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Get references to HTML elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".w-icon");

// Function to check and display weather information
async function checkWeather(city) {
  // Fetch weather data from OpenWeatherMap
  const response = await fetch(apiUrl + city + `&appid=${api_key}`);

  if (response === 404) {
    // Display an error message if the response is 404(not found)
    document.querySelector(".error").style.display = "block";
  } else {
    
    let data = await response.json();

    // Update the HTML elements with weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#176;C";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity;
    document.querySelector(".wind").innerHTML = "Wind Speed: " + data.wind.speed;

    // Set the weather icon based on weather conditions
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  }
}

// Add a click event listener to the search button
searchBtn.addEventListener('click', () => {
  // Call the checkWeather function with the city entered in the input box
  checkWeather(searchBox.value);
});

// Add a keydown event listener to the search input box (for Enter key)
searchBox.addEventListener('keydown', (event) => {
  // Check if the Enter key is pressed
  if (event.key === "Enter") {
    // Call the checkWeather function with the city entered in the input box
    checkWeather(searchBox.value);
  }
});

