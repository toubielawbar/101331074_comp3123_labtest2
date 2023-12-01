import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

const initialState = {
  data: {},
  currentDate: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return { ...state, data: action.payload, currentDate: action.payload.currentDate };
    default:
      return state;
  }
};

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setWeatherData = (data) => {
    dispatch({ type: 'SET_WEATHER_DATA', payload: data });
  };

  const fetchData = async (location) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5db0f1590219f904dbf458bed6019698`;
    try {
      const response = await axios.get(weatherURL);
      const weatherData = response.data;
    //   setWeatherData(weatherData);
    //   setWeatherData(response.data);

      const timestamp = weatherData.dt * 1000; 
    const currentDate = new Date(timestamp);

    setWeatherData({
        ...weatherData,
        currentDate,
      });
    
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const contextValue = {
    data: state.data,
    fetchData,
    currentDate: state.currentDate
  };

  

  return <WeatherContext.Provider value={contextValue}>{children}</WeatherContext.Provider>;
};

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  return context;
};

export { WeatherProvider, useWeatherContext };




