import  { memo, useMemo } from 'react'
import './Favorites.scss';
import { selectedCityProps } from '../../App'
import { FavoriteFilled } from '../../assets/favorite';
const Favorites = ({favorites, selectCityHandler}:{favorites: selectedCityProps[], selectCityHandler: (value: selectedCityProps)=>void}) => {

    const favoritesMemo = useMemo(() => favorites?.map?.((favorite,index) => <div key={`favorite${index}`} className='favorite-item' onClick={()=>selectCityHandler(favorite)}>
        <FavoriteFilled/>
       <div className='favorite-name'>{favorite?.name},</div>
       <div className="favorite-country">{favorite?.country}</div>
    </div>), [favorites])
    return ( favorites.length > 0 ?
        <div className='favorites'>
            <h1 className='favorites-heading' >Favorites</h1>
            {
                favoritesMemo
            }

        </div> :<div>Click on the heart to add to fill this section</div>
    )
}

export default memo(Favorites)
