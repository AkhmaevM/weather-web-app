const date = document.querySelector(".weather__date");
const locationIcon = document.querySelector(".weather__icon");
const currentLocation = document.querySelector(".weather__location");
const weatherDescription = document.querySelector(".weather__description");
const weatherTitle = document.querySelector(".weather__title");
const feels = document.querySelector(".feels");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

let coordinates;

date.textContent = new Date().toDateString();

locationIcon.onclick = () => {

locationIcon.onclick = () => {

  navigator.geolocation.getCurrentPosition(
    async (position) => {

      const { latitude, longitude } = position.coords;
      console.log(`Координаты: ${latitude}, ${longitude}`);

      try {

        // reverse geocoding
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const geoData = await geoResponse.json();

        const city =
          geoData.address.city ||
          geoData.address.town ||
          geoData.address.village ||
          geoData.address.hamlet;

        currentLocation.textContent = city;

        console.log("Ваш город:", city);

        // ---------------------------
        // ЗАПРОС ПОГОДЫ
        // ---------------------------

        const apiKey = "435dd041dc3ab094df36ea81241930ad";

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const weatherData = await weatherResponse.json();

        console.log("Weather:", weatherData);
        
        weatherTitle.textContent = `${weatherData.main.temp_max.toFixed()} ℃ / ${weatherData.main.temp_min.toFixed()} ℃gi `;
        feels.textContent = `${weatherData.main.feels_like} ℃`;
        humidity.textContent = `${weatherData.main.humidity} %`;
        pressure.textContent = `${weatherData.main.pressure} мм рт. ст.`;
        wind.textContent = `${weatherData.wind.speed} м/с`;
        
        weatherDescription.textContent = weatherData.weather[0].description;

      } catch (error) {
        console.error("Ошибка:", error);
      }

    },
    (error) => {
      console.error("Ошибка геолокации:", error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
};
};
