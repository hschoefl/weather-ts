import {
  getIconFromWeatherCode,
  convertGMTToLocalTime,
  getWindDirection,
  getGermanWeekday,
  formatDateTTMMJJJJ,
} from '../utils/helper'
import Sunrise from './Sunrise'
import Sunset from './Sunset'

interface WeatherCardProps {
  time: string
  temperature_2m_max: number
  temperature_2m_min: number
  weather_code: number
  sunrise: string
  sunset: string
  wind_speed_10m_max: number
  wind_direction_10m_dominant: number
  uv_index_max: number
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
  const iconUrl = getIconFromWeatherCode(weather_code)
  const imagePath = new URL(`${iconUrl}`, import.meta.url).href

  return (
    <div className='flex flex-col border-2 border-gray-300 p-8 rounded-lg gap-2 shadow-2xl'>
      <p className='text-2xl font-semibold'>
        {getGermanWeekday(new Date(time))} {formatDateTTMMJJJJ(new Date(time))}
      </p>
      <div className='flex flex-row justify-center w-full'>
        <img src={imagePath} alt='weather icon' className='w-24 h-24' />
      </div>
      <p>{Math.round(temperature_2m_min)} °C</p>
      <p>{Math.round(temperature_2m_max)} °C</p>
      {/* <p>{weather_code}</p> */}

      {/* <p>⬆: {sunrise}</p> */}
      <Sunrise sunrise={convertGMTToLocalTime(sunrise)} />
      {/* <p>⬇: {sunset}</p> */}
      <Sunset sunset={convertGMTToLocalTime(sunset)} />
      <p>Wind Speed: {wind_speed_10m_max} km/h</p>
      <p>Wind Direction: {getWindDirection(wind_direction_10m_dominant)}</p>
      <p>UV Index: {uv_index_max}</p>
    </div>
  )
}
export default WeatherCard
