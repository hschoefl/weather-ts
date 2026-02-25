export function getIconFromWeatherCode(weather_code: number): string {
  let imageUrl = "";

  switch (weather_code) {
    case 0:
      imageUrl = "../assets/icons/bas/clear-day.svg";
      break;

    case 1:
    case 2:
    case 3:
      imageUrl = "../assets/icons/airy/mostly-clear@4x.png";
      break;
  }

  // For frontend projects, just return the image path as a string
  console.log(imageUrl);

  return imageUrl;
}
