import {
  getIconFromWeatherCode,
  convertGMTToLocalTime,
  getWindDirection,
  getGermanWeekday,
  formatDateTTMMJJJJ,
  getUVIndexColor,
} from "../utils/helper";
import Sunrise from "./Sunrise";
import Sunset from "./Sunset";

import imageWind from "../assets/icons/bas/windsock.svg";

interface WeatherCardProps {
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  weather_code: number;
  sunrise: string;
  sunset: string;
  wind_speed_10m_max: number;
  wind_direction_10m_dominant: number;
  uv_index_max: number;
}

function WeatherCard({
  time,
  temperature_2m_max,
  temperature_2m_min,
  weather_code,
  sunrise,
  sunset,
  wind_speed_10m_max,
  wind_direction_10m_dominant,
  uv_index_max,
}: WeatherCardProps) {
  const iconUrl = getIconFromWeatherCode(weather_code);
  const imagePath = new URL(`${iconUrl}`, import.meta.url).href;
  console.log(`col-span-2 bg-[${getUVIndexColor(uv_index_max)}]`);

  return (
    <div className="flex flex-col border-2 border-gray-300 p-8 rounded-lg gap-2 shadow-2xl w-2xs max-w-2xs items-center">
      <p className="text-2xl font-semibold">
        {getGermanWeekday(new Date(time))} {formatDateTTMMJJJJ(new Date(time))}
      </p>
      <div className="flex flex-row justify-center w-full">
        <img src={imagePath} alt="weather icon" className="w-24 h-24" />
      </div>

      <div className="grid grid-cols-2 gap-4 justify-items-left">
        <div className="flex flex-row">
          <p>⬇️</p>
          <p className="ml-2">{Math.round(temperature_2m_min)} °C</p>
        </div>

        <div className="flex flex-row">
          <p>⬆️</p>
          <p className="ml-2">{Math.round(temperature_2m_max)} °C</p>
        </div>

        <Sunrise sunrise={convertGMTToLocalTime(sunrise)} />

        <Sunset sunset={convertGMTToLocalTime(sunset)} />

        <div className="flex flex-row gap-2">
          <img src={imageWind} alt="sunrise icon" className="w-6 h-6" />
          <p>{wind_speed_10m_max} km/h</p>
        </div>

        <div className="flex flex-row">
          <p>🧭</p>
          <p className="ml-2">{getWindDirection(wind_direction_10m_dominant)}</p>
        </div>

        <div className={`col-span-2 flex flex-row`}>
          <p>UV-Index</p>
          <p className={`font-semibold ml-2 px-2 rounded-2xl bg-[${getUVIndexColor(uv_index_max)}]`}>{uv_index_max}</p>
        </div>
      </div>
    </div>
  );
}
export default WeatherCard;
