export function getIconFromWeatherCode(weather_code: number): string {
  let imageUrl = '';

  switch (weather_code) {
    case 0:
    case 1:
      imageUrl = '../assets/icons/bas/clear-day.svg';
      break;

    case 2:
    case 3:
      imageUrl = '../assets/icons/bas/partly-cloudy-day.svg';
      break;
    case 45:
    case 48:
      imageUrl = '../assets/icons/bas/fog.svg';
      break;
    case 51:
    case 53:
    case 55:
      imageUrl = '../assets/icons/bas/drizzle.svg';
      break;

    case 56:
    case 57:
      imageUrl = '../assets/icons/bas/drizzle.svg';
      break;

    case 61:
    case 63:
    case 65:
      imageUrl = '../assets/icons/bas/rain.svg';
      break;

    case 66:
    case 67:
      imageUrl = '../assets/icons/bas/rain.svg';
      break;

    case 71:
    case 73:
    case 75:
      imageUrl = '../assets/icons/bas/snow.svg';
      break;

    case 77:
      imageUrl = '../assets/icons/bas/snow.svg';
      break;

    case 80:
    case 81:
    case 82:
      imageUrl = '../assets/icons/bas/extreme-rain.svg';
      break;

    case 85:
    case 86:
      imageUrl = '../assets/icons/bas/extreme-snow.svg';
      break;

    case 95:
      imageUrl = '../assets/icons/bas/thunderstorms-day.svg';
      break;

    case 96:
    case 99:
      imageUrl = '../assets/icons/bas/thunderstorms-day-extreme.svg';
      break;
  }

  // For frontend projects, just return the image path as a string
  return imageUrl;
}

export function convertGMTToLocalTime(gmtTime: string): string {
  console.log(gmtTime);
  const date = new Date(`${gmtTime}Z`);

  const locales = ['de-DE'];

  return date.toLocaleTimeString(locales, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  });
}

export function getWindDirection(degrees: number): string {
  if (!Number.isFinite(degrees)) {
    return 'N/A';
  }

  const directions = [
    'N',
    'NNO',
    'NO',
    'ONO',
    'O',
    'OSO',
    'SO',
    'SSO',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalizedDegrees / 22.5) % 16;

  return directions[index];
}

export function getGermanWeekday(date: Date): string {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return 'Ungültiges Datum';
  }

  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
  }).format(date);
}

export function formatDateTTMMJJJJ(date: Date): string {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return 'Ungültiges Datum';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}.${month}.${year}`;
}

export function getUVIndexColor(uvIndex: number): string {
  if (uvIndex < 0) return '#6C757D'; // Gray for invalid
  if (uvIndex <= 2) return '#289500'; // Low (Green)
  if (uvIndex <= 5) return '#F7E400'; // Moderate (Yellow)
  if (uvIndex <= 7) return '#F85900'; // High (Orange)
  if (uvIndex <= 10) return '#D8001D'; // Very High (Red)
  return '#6B49C8'; // Extreme (Violet)
}
