const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: import.meta.env.VITE_API_KEY, // Use Vite's way of accessing env variables
  });
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

export default getWeatherData;
