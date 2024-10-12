const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherDisplay = document.getElementById('weather-display');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city !== '') {
        getWeatherData(city);
    } else {
        alert('Пожалуйста, введите название города');
    }
});

async function getWeatherData(city) {
    const apiKey = '7e948f92fff04c59828155253241010';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ru`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new error('Ошибка сети');
        }
        const data = await response.json();

        if (data.error) {
            alert('Город не найден, введите корректное название города.');
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        console.error('Ошибка', error);
        alert('Не удалось получить данные о погоде. Попробуйте позже.')
    }
}

function displayWeatherData(data) {
    const location = `${data.location.name}, ${data.location.country}`;
    const temp = data.current.temp_c;
    const condition =  data.current.condition.text;
    const icon = 'https:' + data.current.condition.icon;

    weatherDisplay.innerHTML = `
    <h2>${location}</h2>
    <img src="${icon}" alt="${condition}">
    <p>${temp}°C, ${condition}</p>
    `
};