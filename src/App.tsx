import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import Layout from './components/Layout/Layout'
import AppBar from './components/AppBar/AppBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Favorites from './components/Favorites/Favorites';

export type selectedCityProps = {
  id?: number;
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
} | null;


function App() {

  const [selectedCity, setSelectedCity] = useState<selectedCityProps>(null);
  const [favorites, setFavorites] = useState<selectedCityProps[]>([])
  const selectCityHandler = useCallback((value: selectedCityProps) => {
    setSelectedCity(value);
  }, []);

  const favoritesCB = useCallback((value: selectedCityProps[]) => {
    setFavorites(value);
  }, [])
  return (
    <>
      <Layout>
        <>

          <AppBar selectCityHandler={selectCityHandler} />
          <WeatherDisplay selectedCity={selectedCity} favoritesCB={favoritesCB} />
          <Favorites favorites={favorites} selectCityHandler={selectCityHandler} />
        </>

      </Layout>
    </>
  )
}

export default App
