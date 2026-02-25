import { useQuery } from '@tanstack/react-query'

import WeatherCard from './WeatherCard'

interface WeatherContainerProps {
  cityName: string
  cityLabel: string
}

interface Coordinates {
  lat: number
  lon: number
}

interface WeatherData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
  sunrise: string[]
  sunset: string[]
  wind_speed_10m_max: number[]
  wind_direction_10m_dominant: [number]
  uv_index_max: [number]
}

function WeatherContainer({ cityName, cityLabel }: WeatherContainerProps) {
  // fetch the latitude and longitude of the city using the geocoding API
  async function fetchCoordinatesByCityName(cityName: string) {
    const URL = import.meta.env.VITE_GEO_CODING_URL
    const requestUrl = `${URL}?name=${cityName}&count=1&format=json`
    console.log(requestUrl)

    const response = await fetch(requestUrl)
    const data = await response.json()

    const coordinates: Coordinates = {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    }

    console.log(coordinates)
    return coordinates
  }

  async function fetchWeatherByCoordinates(coordinates: Coordinates) {
    const URL = import.meta.env.VITE_WEATHER_URL
    const requestUrl = `${URL}?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max&forecast_days=3&format=json`
    console.log(requestUrl)

    const response = await fetch(requestUrl)
    const data = await response.json()

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
    }

    console.log(weatherData)
    return weatherData
  }

  const { data: coordinates } = useQuery({
    queryKey: ['coordinates', cityName],
    queryFn: () => fetchCoordinatesByCityName(cityName),
  })

  const { data: weatherData } = useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => fetchWeatherByCoordinates(coordinates!),
    enabled: !!coordinates,
  })

  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-4xl font-extrabold'>{cityLabel}</p>
      <div className='flex flex-row gap-10'>
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
              wind_direction_10m_dominant={
                weatherData.wind_direction_10m_dominant[index]
              }
              uv_index_max={weatherData.uv_index_max[index]}
            />
          ))}
      </div>
    </div>
  )
}
export default WeatherContainer
