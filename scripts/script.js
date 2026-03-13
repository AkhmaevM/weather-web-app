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
  // navigator.geolocation.getCurrentPosition(
  //   (pos) => console.log(pos),
  //   (error) => console.log(error),
  // );


    // fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.latitude}lon=${pos.longtitude}`)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data.address.city || data.address.town);
    // })

    // 1. Запрашиваем координаты
navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    console.log(`Координаты: ${latitude}, ${longitude}`);

    // 2. Делаем запрос к API для получения города (Reverse Geocoding)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/lat=${latitude}&lon=${longitude}`
        // `https://nominatim.openstreetmap.org/ui/reverse.html?lat=${latitude}&lon=${longitude}&zoom=12`
      );
      const data = await response.json();
      
      // Извлекаем город (учитываем разные типы населенных пунктов)
      const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
      
      console.log(`Ваш город: ${city}`);
    } catch (error) {
      console.error("Ошибка при получении адреса:", error);
    }
  },
  (error) => {
    // Обработка ошибок (запрет доступа, сбой GPS и т.д.)
    console.error("Ошибка геолокации:", error.message);
  },
  {
    enableHighAccuracy: true, // Попытаться получить максимально точные данные
    timeout: 5000,            // Время ожидания ответа от спутника/сети
    maximumAge: 0             // Не использовать кэшированные данные
  }
);
};
