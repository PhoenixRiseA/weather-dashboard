import axios from "axios";
import { selectedCityProps } from "../App";
const {VITE_WEATHER_API_KEY, VITE_JSON_SERVER_API, VITE_OPEN_WEATHER_API, VITE_OPENAI_API_KEY } = import.meta.env;
const openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VITE_OPENAI_API_KEY}`,
    },
  });

  export const getOpenAIResponse = async (prompt:string) => {
    const response = await openai.post('/completions', {
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      max_tokens: 150,
    });
    return response.data;
  };
export const currentLocationWeather = async (position:GeolocationCoordinates,units:string) => {
    try {
        const data = await axios.get(VITE_OPEN_WEATHER_API + `lat=${position.latitude}&lon=${position.longitude}&appid=${VITE_WEATHER_API_KEY}&units=${units}`);
        return data.data;
    } catch (error) {

        return error;
    }
}
export const selectedLocationWeather = async (position:{latitude:number, longitude: number},units:string) => {
    try {
        const data = await axios.get(VITE_OPEN_WEATHER_API + `lat=${position.latitude}&lon=${position.longitude}&appid=${VITE_WEATHER_API_KEY}&units=${units}`);
        return data.data;
    } catch (error) {
        return error;
    }
};

export const getCurrentCity = async (position:{latitude:number, longitude: number}) => {
    try {
        const data = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.latitude}&lon=${position.longitude}&appid=${VITE_WEATHER_API_KEY}`)
        return data.data;
    } catch (error) {
        return error;
    }
}
export const addToFavorites = async (payload:selectedCityProps) => {
    try {
        const data = await axios.post(`${VITE_JSON_SERVER_API}/favorites`,payload);
        return data.data;
    } catch (error: any) {
        return error
    }
};
export const getFavorites = async () => {
    try {
        const data = await axios.get(`${VITE_JSON_SERVER_API}/favorites`);
        return data.data;
    } catch (error: any) {
        return error
    }
}
export const deleteFavorite = async (id:number) => {
    try {
        const data = await axios.delete(`${VITE_JSON_SERVER_API}/favorites/${id}`);
        return data?.data;
    } catch (error: any) {
        return error
    }
}


