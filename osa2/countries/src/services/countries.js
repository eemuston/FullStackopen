import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getWeatherdata = (capital) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
  
    return axios.get(apiUrl + capital + `&appid=${api_key}`).then(response => {
      return response.data;
    });
};

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    const country = response.data.map(country => country);
    return country
  })
}

export default { getAll, getWeatherdata }