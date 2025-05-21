const apiKey ='68e861c2aa502725482d78e7aac2db3a'; // Api с сайта OpenWeather

async function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    const weatherInfoDiv = document.getElementById('weather-info');

    if (!city) {
        weatherInfoDiv.innerHTML = '<p>Введите название города.</p>';
        return;
    }

    try {
        // Добавляем lang=ru в запрос
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`);
        
        if (!response.ok) {
            throw new Error('Город не найден');
        }

        const data = await response.json();

        const { name, main, weather } = data;
        const icon = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

        weatherInfoDiv.innerHTML = `
            <div class="weather-card">
                <h2>${name}</h2>
                <img src="${icon}" alt="Иконка погоды">
                <p><strong>Температура:</strong> ${main.temp} °C</p>
                <p><strong>Описание:</strong> ${weather[0].description}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        weatherInfoDiv.innerHTML = `<p>${error.message || 'Ошибка загрузки данных.'}</p>`;
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    
    if (currentTheme === 'light') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}