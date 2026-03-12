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
  navigator.geolocation.getCurrentPosition(
    (pos) => console.log(pos),
    (error) => console.log(error),
  );
};
