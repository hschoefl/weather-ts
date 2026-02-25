import { useQuery } from "@tanstack/react-query";

import WeatherCard from "./WeatherCard";

interface WeatherContainerProps {
  city: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

function WeatherContainer({ city }: WeatherContainerProps) {
  // fetch the latitude and longitude of the city using the geocoding API
  async function fetchCoordinatesByCityName(city: string) {
    const URL = import.meta.env.VITE_GEO_CODING_URL;
    const requestUrl = `${URL}?name=${city}&count=1&format=json`;
    console.log(requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json();

    const coordinates: Coordinates = {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };

    console.log(coordinates);
    return coordinates;
  }

  async function fetchWeatherByCoordinates(coordinates: Coordinates) {
    const URL = import.meta.env.VITE_WEATHER_URL;
    const requestUrl = `${URL}?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3`;
    console.log(requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json();

    const weatherData: WeatherData = {
      time: data.daily.time,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
      weather_code: data.daily.weather_code,
    };

    console.log(weatherData);
    return weatherData;
  }

  const { data: coordinates } = useQuery({
    queryKey: ["coordinates", city],
    queryFn: () => fetchCoordinatesByCityName(city),
  });

  const { data: weatherData } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCoordinates(coordinates!),
    enabled: !!coordinates,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-4xl font-extrabold">{city}</p>
      <div className="flex flex-row gap-10">
        {weatherData &&
          weatherData.time.length > 0 &&
          weatherData.time.map((time, index) => (
            <WeatherCard
              key={index}
              time={time}
              temperature_2m_max={weatherData.temperature_2m_max[index]}
              temperature_2m_min={weatherData.temperature_2m_min[index]}
              weather_code={weatherData.weather_code[index]}
            />
          ))}
      </div>
    </div>
  );
}
export default WeatherContainer;
