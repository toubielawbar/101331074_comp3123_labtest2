import React, { useState } from 'react';
import { useWeatherContext } from '../contexts/WeatherContext';


const Weather = () => {
  const { data, fetchData,  } = useWeatherContext();
  const [location, setLocation] = useState('');

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchData(location);
      setLocation('');
    }
  };


  const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="top">
        <div className="date">
        
        </div>

        <div className="location">
        
          <p>{data.name}</p>
        </div>
        <div className="temperature">
        {data.main ? <h1>{toCelsius(data.main.temp).toFixed()}°C</h1> : null}
        </div>
        <div className="descriptions">
          {data.weather ? (
            <img
              src={getWeatherIconUrl(data.weather[0].icon)}
              alt={data.weather[0].description}
            />
          ) : null}
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

      </div>

      {data.name !== undefined && (
        <div className="bottom">
          <div className="percentage">
            {data.main ? <p className="bold">{toCelsius(data.main.temp).toFixed()}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
