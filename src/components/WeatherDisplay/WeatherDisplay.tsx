import React, {  useEffect, useState } from 'react'
import './WeatherDisplay.scss';
import {  addToFavorites, currentLocationWeather, deleteFavorite, getFavorites, selectedLocationWeather } from '../../RestServices/RestServices';
import Toast from '../Toast/Toast';
import { toast } from 'react-toastify';
import { selectedCityProps } from '../../App';
import Spinner from '../Spinner/Spinner';
import { FavoriteBordered, FavoriteFilled } from '../../assets/favorite';
import TooltipComp from '../Tooltip/Tooltip';
import WeatherSummary from '../WeatherSummary/WeatherSummary';



const WeatherDisplay = ({ selectedCity, favoritesCB ,  }: { selectedCity: selectedCityProps, favoritesCB:(value: selectedCityProps[]) => void },) => {
    
    const [weather, setWeather] = useState<any>(null);
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteCity, setFavoriteCity] = useState<selectedCityProps>(null);
    const [favorites, setFavorites] = useState<selectedCityProps[]>([]);
    const checkIfFavorite = () => {
        
        if(weather && favorites.length > 0){
            const index = favorites.findIndex((city)=>city?.name === weather.name) ;
            setFavoriteCity(favorites[index]);
            if(index > -1){
              return true;
            } 
            return false;
        }
        return false;
       
    }
    const fetchCurrentWeatherData: PositionCallback = async (position) => {

        try {
            setLoading(true);
            const data = await currentLocationWeather(position.coords, units);
            setWeather(data);
        } catch (error) {
            toast.error("Can't fetch details right now")
        } finally {
            setLoading(false);
        }
    };

    const fetchSelectedWeatherData = async (selectedCity: selectedCityProps) => {
        try {
            setLoading(true);
            if (selectedCity) {
                const data = await selectedLocationWeather({ latitude: selectedCity?.lat, longitude: selectedCity?.lon }, units);
                setWeather(data);
            }

        } catch (error) {
            toast.error("Can't fetch details right now")
        } finally {
            setLoading(false);
        }
    }
    const fetchFavorites = async () => {
        
        try {
            const data = await getFavorites();
            setFavorites(data);
            favoritesCB(data);
        } catch (error) {
            console.log(error);
        }
        
    };

    useEffect(()=>{
        fetchFavorites()
    },[])
    useEffect(()=>{

        setIsFavorite(checkIfFavorite())
    },[favorites, weather])
    useEffect(() => {
        
        if (selectedCity) {
            fetchSelectedWeatherData(selectedCity)
        }
    }, [selectedCity, units]);
    useEffect(() => {
        if (!selectedCity) {
            navigator.geolocation.getCurrentPosition(fetchCurrentWeatherData);

        }
    }, [units]);
    let date = new Date;

    const addToFavoriteHandler = async () => {
        try {
            const payload: selectedCityProps = {
                country: String(weather.sys.country),
                lat: Number(weather.coord.lat),
                lon: Number(weather.coord.lon),
                name: String(weather.name)
            }
            await addToFavorites(payload );
            fetchFavorites();
            toast.success("Added to Favorites");
        } catch (error:any) {
            toast.error(error);
        }
    };

    const deleteFavoriteHandler = async () => {
        try {
            await deleteFavorite(Number(favoriteCity?.id));
            fetchFavorites();
            toast.success("Success")
        } catch (error) {
            toast.error("Failed");
            console.log(error);
        }
    }
    return (
        <div className='weather-display'>
            {!weather ? <Spinner/> : <>
                <div className='weather-display-name'>
                    {weather?.name + ", " + weather.sys?.country}
                    <a onClick={isFavorite ? deleteFavoriteHandler :addToFavoriteHandler} data-tooltip-id='favorite' data-tooltip-content={isFavorite ? "Remove from Favorites" :"Add To Favorites"} className='weather-tooltip-anchor' >
                       { isFavorite ? <FavoriteFilled/> : <FavoriteBordered  />}
                    </a>
                    <TooltipComp id='favorite' place='right' className='weather-display-tooltip' ></TooltipComp>
                    
                </div>

                <div className='weather-display-summary'>
                    {weather?.weather?.[0].description}
                    <div id="icon"><img id="wicon" src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} alt="Weather icon" /></div>
                </div>
                <div className='weather-display-temp' >

                    <button onClick={() => setUnits('metric')} className={`temp-c ${units === 'metric' ? " active" : ""}`} >&#176;C</button>
                    <button onClick={() => setUnits('imperial')} className={`temp-f ${units === 'imperial' ? " active" : ""}`} >&#176;F</button>
                    {loading ? <Spinner /> : <div className="temp-max">{Math.trunc(weather.main.temp_max)} &#176;{(units === 'metric' ? "C" : ' F')}</div>}
                    {loading ? <Spinner /> : <div className='temp'>{Math.trunc(weather.main.temp)} &#176;{(units === 'metric' ? "C" : ' F')}<span>Feels like {Math.trunc(weather.main.feels_like)} &#176;{(units === 'metric' ? "C" : ' F')} </span></div>}
                    {loading ? <Spinner /> : <div className="temp-min">{Math.trunc(weather.main.temp_min)} &#176;{(units === 'metric' ? "C" : ' F')}</div>}
                    {/* <div className="feels-like">"Feels Like:"{weather.main.feels_like + (units === 'metric' ? " C" : ' K')}</div> */}

                </div>
                <div className='weather-display-date'>{date.toLocaleDateString()}</div>
            </>}
            <WeatherSummary weather={weather} units={units}/>
            <Toast />

        </div>
    )
}

export default React.memo(WeatherDisplay)
