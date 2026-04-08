export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
  wind_speed_10m_max: number[];
  wind_direction_10m_dominant: [number];
  uv_index_max: [number];
  relative_humidity_2m_max: [number];
}

// fetch the latitude and longitude of the city using the geocoding API
export async function fetchCoordinatesByCityName(cityName: string) {
  const URL = import.meta.env.VITE_GEO_CODING_URL;
  const requestUrl = `${URL}?name=${cityName}&count=1&format=json`;
  // console.log(requestUrl);

  const response = await fetch(requestUrl);
  const data = await response.json();

  const coordinates: Coordinates = {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
  };

  // console.log(coordinates);
  return coordinates;
}

export async function fetchWeatherByCoordinates(coordinates: Coordinates) {
  const URL = import.meta.env.VITE_WEATHER_URL;

  const requestUrl = `${URL}?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,relative_humidity_2m_max&forecast_days=3&format=json`;
  // console.log(requestUrl);

  const response = await fetch(requestUrl);
  const data = await response.json();

  const weatherData: WeatherData = {
    time: data.daily.time,
    temperature_2m_max: data.daily.temperature_2m_max,
    temperature_2m_min: data.daily.temperature_2m_min,
    weather_code: data.daily.weather_code,
    sunrise: data.daily.sunrise,
    sunset: data.daily.sunset,
    wind_speed_10m_max: data.daily.wind_speed_10m_max,
    wind_direction_10m_dominant: data.daily.wind_direction_10m_dominant,
    uv_index_max: data.daily.uv_index_max,
    relative_humidity_2m_max: data.daily.relative_humidity_2m_max,
  };

  // console.log(weatherData);
  return weatherData;
}
