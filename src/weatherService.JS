import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: import.meta.env.VITE_API_KEY,
  });
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForcastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};
const getFormattedWeatherData = async (searchParams) => {
  try {
    const currentWeatherResponse = await getWeatherData(
      "weather",
      searchParams
    );
    const formattedCurrentWeather = formatCurrentWeather(
      currentWeatherResponse
    );

    const { lat, lon } = formattedCurrentWeather;

    const forecastWeatherResponse = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    });

    const formattedForecastWeather = formatForcastWeather(
      forecastWeatherResponse
    );

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local TimeL 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};
const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
