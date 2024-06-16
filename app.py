from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    data = request.get_json()
    location = data['location']
    api_key = os.getenv('WEATHER_API_KEY')
    weather_url = f'http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric'
    
    response = requests.get(weather_url)
    weather_data = response.json()

    if response.status_code == 200:
        return jsonify(weather_data)
    else:
        return jsonify({'error': 'Location not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0')


