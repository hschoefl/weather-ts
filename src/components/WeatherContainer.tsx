import { useQuery } from "@tanstack/react-query";

import { fetchWeatherByCoordinates, type Coordinates } from "../api/meteo";

import WeatherCard from "./WeatherCard";
import { fetchEnsembleForecastByCoordinates } from "../api/geosphere";

interface WeatherContainerProps {
  cityName: string;
  lat: number;
  lon: number;
}

function WeatherContainer({ cityName, lat, lon }: WeatherContainerProps) {
  const coordinates: Coordinates = {
    lat: lat,
    lon: lon,
  };

  // const { data: coordinates } = useQuery({
  //   queryKey: ["coordinates", cityName],
  //   queryFn: () => fetchCoordinatesByCityName(cityName),
  // });

  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", cityName],
    queryFn: () => fetchWeatherByCoordinates(coordinates!),
    enabled: !!coordinates,
  });

  const {
    data: ensembleForecastData,
    isLoading: isEnsembleForecastLoading,
    isError: isEnsembleForecastError,
  } = useQuery({
    queryKey: ["ensembleForecast", cityName],
    queryFn: () => fetchEnsembleForecastByCoordinates(coordinates!),
    enabled: !!coordinates,
  });

  // early returns if loading or error
  if (isLoading || isEnsembleForecastLoading) {
    return <p className="text-3xl">Lade Wetterdaten ...</p>;
  }

  if (isError || isEnsembleForecastError || !weatherData || !ensembleForecastData) {
    return (
      <p className="text-3xl mx-3 text-center">
        Es tut uns leid. Die Wetterdaten können momentan nicht geladen werden. Bitte versuchen Sie es später erneut.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-4xl font-extrabold mb-12">3 Tages Prognose für {cityName}</p>
      <div className="flex flex-row gap-12">
        {weatherData &&
          weatherData.time.length > 0 &&
          weatherData.time.map((time, index) => (
            <WeatherCard
              key={index}
              time={time}
              temperature_2m_max={weatherData.temperature_2m_max[index]}
              temperature_2m_min={weatherData.temperature_2m_min[index]}
              weather_code={weatherData.weather_code[index]}
              sunrise={weatherData.sunrise[index]}
              sunset={weatherData.sunset[index]}
              wind_speed_10m_max={weatherData.wind_speed_10m_max[index]}
              wind_direction_10m_dominant={weatherData.wind_direction_10m_dominant[index]}
              uv_index_max={weatherData.uv_index_max[index]}
              relative_humidity_2m_max={weatherData.relative_humidity_2m_max[index]}
            />
          ))}
      </div>
    </div>
  );
}
export default WeatherContainer;
