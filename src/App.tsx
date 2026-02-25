import WeatherContainer from "./components/WeatherContainer";

function App() {
  const paramString = window.location.search;
  const searchParams = new URLSearchParams(paramString);
  const city = searchParams.get("city") || "Wien";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <WeatherContainer city={city} />
      </div>
    </>
  );
}

export default App;
