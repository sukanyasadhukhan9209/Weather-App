const weather = {
  apiKey: "791aa3ee0569c13ae61c93778805206e",

  // Function to fetch weather data
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  playWeatherSound: function (condition) {
    const weatherSound = document.getElementById("weather-sound");
    let soundFile = "";

    // Determine the sound file based on the weather condition
    if (condition.includes("rain")) {
        soundFile = "sounds/rain.mp3";
    } else if (condition.includes("wind")) {
        soundFile = "sounds/wind.mp3";
    } else if (condition.includes("clear")) {
        soundFile = "sounds/clear.mp3";
    } else if (condition.includes("cloud")) {
        soundFile = "sounds/cloudy.mp3";
    } else {
        soundFile = "sounds/default.mp3"; // Default sound for other conditions
    }

    // Log the selected sound file
    console.log("Playing sound file:", soundFile);

    // Update and play the audio
    weatherSound.src = soundFile;

    // Attempt to play the audio
    weatherSound.play().then(() => {
        console.log("Sound played successfully");
    }).catch(error => {
        console.log("Error playing sound:", error);
    });
},

playBackgroundSound: function () {
    const backgroundSound = document.getElementById("bg-sound");
    backgroundSound.loop = true; // Loop the background sound

    // Attempt to play the background sound
    backgroundSound.play().then(() => {
        console.log("Background sound is playing");
    }).catch(error => {
        console.log("Error playing background sound:", error);
    });
},


  // Function to display weather data
  displayWeather: function (data) {
    const { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { temp, feels_like, humidity, temp_min, temp_max } = data.list[0].main;
    const { speed } = data.list[0].wind;
    const datetime = data.list[0].dt_txt;

    // Convert temperature function based on selected unit
    const convertTemp = (temp, unit) => {
      if (unit === "F") {
        return ((temp * 9) / 5 + 32).toFixed(2);
      } else if (unit === "K") {
        return (temp + 273.15).toFixed(2);
      } else {
        return temp.toFixed(2);
      }
    };

    const selectedUnit = ttt; // Get the selected temperature unit

    // Update current weather info
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".dt").innerText = "Last updated: " + datetime;

    // Temperature updates
    document.querySelector(".temp").innerText = convertTemp(temp, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-feels-like").innerText = "Feels like: " + convertTemp(feels_like, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-avg").innerText = "Avg Temp: " + convertTemp((temp_min + temp_max) / 2, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-min").innerText = "Min Temp: " + convertTemp(temp_min, selectedUnit) + " °" + selectedUnit;
    document.querySelector(".temp-max").innerText = "Max Temp: " + convertTemp(temp_max, selectedUnit) + " °" + selectedUnit;

    // Additional weather info
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

    // Remove loading class for visibility
    document.querySelector(".weather").classList.remove("loading");

    // Update weather forecast for the next 5 time intervals
    const forecastUpdates = [
      { icon: ".icon1", temp: ".temp1", dt: ".dt1", index: 6 },
      { icon: ".icon2", temp: ".temp2", dt: ".dt2", index: 12 },
      { icon: ".icon3", temp: ".temp3", dt: ".dt3", index: 18 },
      { icon: ".icon4", temp: ".temp4", dt: ".dt4", index: 24 },
      { icon: ".icon5", temp: ".temp5", dt: ".dt5", index: 30 },
    ];

    // Iterate and update forecast details
    forecastUpdates.forEach((forecast) => {
      document.querySelector(forecast.icon).src = 
        "https://openweathermap.org/img/wn/" + data.list[forecast.index].weather[0].icon + ".png";
      document.querySelector(forecast.temp).innerText = 
        convertTemp(data.list[forecast.index].main.temp, selectedUnit) + " °" + selectedUnit;
      document.querySelector(forecast.dt).innerText = data.list[forecast.index].dt_txt;
    });

    // Play weather sound based on current weather condition
    this.playWeatherSound(description.toLowerCase());
  },

  // Search functionality
  search: function () {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      this.fetchWeather(city);
      this.playBackgroundSound(); // Play the background sound when searching
    }
  }
};

// Event listeners for search functionality
document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Default temperature unit (Celsius) and event listener for unit change
let ttt = "C";
document.querySelector("select").addEventListener("change", function (evt) {
  ttt = evt.target.value;
  const currentCity = document.querySelector(".city").innerText.split("Weather in ")[1] || "Bangalore";
  weather.fetchWeather(currentCity); // Refresh weather data on unit change
});

// Initial fetch for default city
weather.fetchWeather("Bangalore");

// Play background sound on page load
document.addEventListener("DOMContentLoaded", () => {
    const weatherSound = document.getElementById("weather-sound");
    weatherSound.src = "./sounds/default.mp3"; // Set the source for background sound
    weatherSound.loop = true; // Loop the sound
    weatherSound.play().catch(error => {
        console.log("Error playing sound:", error); // Handle any errors
    });
});

