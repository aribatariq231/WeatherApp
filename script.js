const apiKey = "3f440b9f6bd853ec16cdbd37e1bd6590";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Invalid API Key
    if (data.cod == 401) {
      alert("Invalid API Key");
      return;
    }

    // City Not Found
    if (data.cod == 404) {
      document.getElementById("error").style.display = "block";
      document.getElementById("weatherInfo").style.display = "none";
      return;
    }

    document.getElementById("error").style.display = "none";
    document.getElementById("weatherInfo").style.display = "block";

    document.getElementById("cityName").innerText = data.name;

    document.getElementById("temperature").innerText =
      Math.round(data.main.temp) + "°C";

    document.getElementById("description").innerText =
      data.weather[0].description;

    document.getElementById("humidity").innerText =
      data.main.humidity + "%";

    document.getElementById("wind").innerText =
      data.wind.speed + " km/h";

    const iconCode = data.weather[0].icon;

    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  } catch (error) {
    console.log("Error:", error);
  }
}