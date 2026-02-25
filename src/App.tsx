import WeatherContainer from './components/WeatherContainer'

function App() {
  const paramString = window.location.search
  const searchParams = new URLSearchParams(paramString)
  const cityName = searchParams.get('cityName') || 'Vienna'
  const cityLabel = searchParams.get('cityLabel') || 'Wien'

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <WeatherContainer cityName={cityName} cityLabel={cityLabel} />
      </div>
    </>
  )
}

export default App
