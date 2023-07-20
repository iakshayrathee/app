// fetch(
//   "https://api.unsplash.com/photos/random?client_id=2coXeaQHer5-S-vUlvrM-nmaI1wb1e_dc-VXpIZ4SHw&query=city"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     const imageUrl = data.urls.regular;
//     const imageContainer = document.querySelector("body");
//     imageContainer.style.backgroundImage = `url(${imageUrl})`;
//   });

let weather = {
  apiKey: "YOUR API KEY",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    
    //location not found
    const locationNot = document.querySelector(".location-not-found");
    const weather_body = document.querySelector(".weather");
    const error  = data.cod;
    if (error === "404") {
      locationNot.style.display = "block";
      weather_body.style.display = "none";
      return;
    }

    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    const image = document.querySelector(".icon");
    document.querySelector(".city").innerText = "Weather in " + name;
    //document.querySelector(".icon").src = "images/mist.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity \n " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed \n " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

    if (data.weather[0].main == "Clouds") {
      image.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      image.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      image.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      image.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      image.src = "./images/mist.png";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");
