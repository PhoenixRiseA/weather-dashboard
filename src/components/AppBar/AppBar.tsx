import { FormEvent, useCallback, useMemo, useState } from 'react'
import './AppBar.scss';
import axios from 'axios';
import { debounce } from '../../utils';
import { selectedCityProps } from '../../App';
import {  toast } from 'react-toastify';
import Toast from '../Toast/Toast';
import Select from 'react-select'
const AppBar = (props: { selectCityHandler: (value: selectedCityProps) => void }) => {
    const { VITE_WEATHER_API_KEY } = import.meta.env;
    const [citySearch, setCitySearch] = useState('');
    const [cities, setCites] = useState<selectedCityProps[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchCities = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=5&appid=${VITE_WEATHER_API_KEY}`);
            props.selectCityHandler(data.data[0])
            if(data.data.length === 0){
                toast.warning("No cities matched your search");
            }
            setCites(data.data);
        } catch (error) {
            toast.error("Fetch failed, contact your admiministrator")
        } finally {
            setLoading(false);
        }

    }, [citySearch]);

    const citySearchHanlder = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
        setCitySearch(e.target.value)
    },[]);
    const citiesOptionsMemo = useMemo(()=>cities.map(city=>{
        return {value:city,label:`${city?.name},${city?.country}`}
    }),[cities])


    return (
        <div style={{ cursor: loading ? "progress" : 'pointer' }}>
            <Toast/>
            <form className="search" onSubmit={fetchCities} >
                <input className='search-input' type="search" placeholder="Search here..." onChange={debounce(citySearchHanlder,300)} required />
                <button className='search-button' type="submit">Search</button>
            </form>
            {cities.length > 0 &&  <div className='select-dropdown-container' >
                <Select
                    options={citiesOptionsMemo}
                    onChange={(fullCity ) => {
                        if(fullCity?.value) props.selectCityHandler(fullCity?.value)
                        
                        return
                    }}
                    
                />
            </div>}
            
        </div>
    )
}

export default AppBar
