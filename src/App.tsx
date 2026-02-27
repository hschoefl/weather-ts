import WeatherContainer from "./components/WeatherContainer";

function App() {
  const paramString = window.location.search;
  const searchParams = new URLSearchParams(paramString);
  const cityName = searchParams.get("cityName") || "Wien";
  const lat = searchParams.get("lat") || "48.2082";
  const lon = searchParams.get("lon") || "16.3738";

  return (
    <>
      <div className="flex flex-col items-center justify-center w-480 h-200 bg-amber-200">
        <WeatherContainer cityName={cityName} lat={parseFloat(lat)} lon={parseFloat(lon)} />
      </div>
    </>
  );
}

export default App;

// GPS Koordinaten
// Wien: 48.2082° N, 16.3738° E, http://localhost:5173/?cityName=Wien&lat=48.2082&lon=16.3738
// Graz: 47.0707° N, 15.4395° E, http://localhost:5173/?cityName=Graz&lat=47.0707&lon=15.4395
// Bad Häring: 47.8095° N, 13.0550° E, http://localhost:5173/?cityName=Bad%20Häring&lat=47.8095&lon=13.0550
// Kalwang: 47.8095° N, 13.0550° E, http://localhost:5173/?cityName=Kalwang&lat=47.4095&lon=14.0550
// Tobelbad: 47.8095° N, 13.0550° E, http://localhost:5173/?cityName=Tobelbad&lat=47.4095&lon=14.0550
// Klagenfurt: 46.6242° N, 14.3054° E, http://localhost:5173/?cityName=Klagenfurt&lat=46.6242&lon=14.3054
// Salzburg: 47.8095° N, 13.0550° E, http://localhost:5173/?cityName=Salzburg&lat=47.8095&lon=13.0550
