import type { Coordinates } from "./meteo";

// this file contains all geosphere related api calls

export async function fetchEnsembleForecastByCoordinates(coordinates: Coordinates) {
  const URL = import.meta.env.VITE_ENSEMBLE_FORECAST_URL;
  const requestUrl = `${URL}?lat_lon=${coordinates.lat},${coordinates.lon}&parameters=tcc,t2m,mnt2m,mxt2m&output_format=geojson`;
  console.log("Request URL: ", requestUrl);
  console.log(requestUrl);

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch ensemble forecast: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.features);

  return data;
}
