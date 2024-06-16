document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    fetch('/get_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: location })
    })
    .then(response => response.json())
    .then(data => {
        const weatherResult = document.getElementById('weatherResult');
        if (data.error) {
            weatherResult.innerHTML = `<p>${data.error}</p>`;
        } else {
            weatherResult.innerHTML = `
                <p>Location: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

