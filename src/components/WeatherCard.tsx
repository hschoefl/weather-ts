import { getIconFromWeatherCode } from "../utils/helper";

interface WeatherCardProps {
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  weather_code: number;
}

function WeatherCard({ time, temperature_2m_max, temperature_2m_min, weather_code }: WeatherCardProps) {
  const iconUrl = getIconFromWeatherCode(weather_code);
  const imagePath = new URL(`${iconUrl}`, import.meta.url).href;

  return (
    <div className="flex flex-col border-2 border-gray-300 p-8 rounded-lg gap-2 shadow-2xl">
      <p>{time}</p>
      <p>{temperature_2m_min}°C</p>
      <p>{temperature_2m_max}°C</p>
      <p>{weather_code}</p>
      <img src={imagePath} alt="weather icon" className="w-24 h-24" />
    </div>
  );
}
export default WeatherCard;
