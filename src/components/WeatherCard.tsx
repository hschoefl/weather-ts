import {
  getIconFromWeatherCode,
  convertGMTToLocalTime,
  getWindDirection,
  getGermanWeekday,
  formatDateTTMMJJJJ,
  getUVIndexColor,
} from '../utils/helper'

import imageWind from '../assets/icons/bas/windsock.svg'
import imageUVIndex from '../assets/icons/UV-Index.png'
import imageHumidity from '../assets/icons/humidity.png'
import imageSunrise from '../assets/icons/bas/sunrise.png'
import imageSunset from '../assets/icons/bas/sunset.png'

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
  relative_humidity_2m_max: number
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
  relative_humidity_2m_max,
}: WeatherCardProps) {
  const iconUrl = getIconFromWeatherCode(weather_code)
  const imagePath = new URL(`${iconUrl}`, import.meta.url).href
  console.log(`col-span-2 bg-[${getUVIndexColor(uv_index_max)}]`)

  return (
    <div className='flex flex-col border-2 border-gray-300 p-8 rounded-lg gap-2 shadow-2xl w-s max-w-s items-center bg-white'>
      <p className='text-3xl font-semibold self-start'>
        {getGermanWeekday(new Date(time))}, {formatDateTTMMJJJJ(new Date(time))}
      </p>

      <div className='flex flex-row justify-center w-full'>
        <img src={imagePath} alt='weather icon' className='w-32 h-32' />
      </div>

      {/* Grid for values */}
      <div className='grid grid-cols-2 gap-6 justify-items-left'>
        {/* Minimum temperature */}
        <div className='grid grid-cols-12 justify-items-start text-2xl'>
          <p className='text-2xl col-span-4'>⬇️</p>
          <p className='col-span-8'>{Math.round(temperature_2m_min)} °C</p>
        </div>

        {/* Maximum temperature */}
        <div className='grid grid-cols-12 justify-items-start text-2xl'>
          <p className='text-2xl col-span-4'>⬆️</p>
          <p className='col-span-8'>{Math.round(temperature_2m_max)} °C</p>
        </div>

        {/* Sunrise */}
        <div className='grid grid-cols-12 justify-items-start'>
          <img
            src={imageSunrise}
            alt='sunrise icon'
            className='w-6 h-6 col-span-4'
          />
          <p className='text-2xl col-span-8'>
            {convertGMTToLocalTime(sunrise)} Uhr
          </p>
        </div>

        {/* Sunset */}
        <div className='grid grid-cols-12 justify-items-start text-2xl'>
          <img
            src={imageSunset}
            alt='sunset icon'
            className='w-6 h-6 col-span-4'
          />
          <p className='text-2xl col-span-8'>
            {convertGMTToLocalTime(sunset)} Uhr
          </p>
        </div>

        {/* Wind Speed */}
        <div className='grid grid-cols-12 justify-items-start text-2xl'>
          <img src={imageWind} alt='wind icon' className='w-8 h-8 col-span-4' />
          <p className='text-2xl col-span-8'>{wind_speed_10m_max} km/h</p>
        </div>

        {/* Wind Direction */}
        <div className='grid grid-cols-12 justify-items-start text-2xl'>
          <p className='text-2xl col-span-4'>🧭</p>
          <p className='col-span-8'>
            {getWindDirection(wind_direction_10m_dominant)}
          </p>
        </div>

        {/* Humidity */}
        <div className={`grid grid-cols-12 justify-items-start text-2xl`}>
          <img
            src={imageHumidity}
            alt='Humidity icon'
            className='w-8 h-8 col-span-4'
          />
          <p className='text-2xl col-span-8'>{relative_humidity_2m_max} %</p>
        </div>

        {/* UV Index  */}
        <div className={`grid grid-cols-12 justify-items-start text-2xl`}>
          <img
            src={imageUVIndex}
            alt='UV Index icon'
            className='w-8 h-8 col-span-4'
          />
          <p
            className={`text-2xl rounded-2xl col-span-8 bg-[${getUVIndexColor(uv_index_max)}]`}
          >
            {uv_index_max}
          </p>
        </div>
      </div>
      {/* End of grid */}
    </div>
  )
}
export default WeatherCard
