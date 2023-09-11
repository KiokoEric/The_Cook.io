import React from 'react';
import "../Favourites/Favourites.css"
import { Link  } from 'react-router-dom';
import { useAppContext } from '../../Components/Context/AppContext';

const Favourites = () => {

    const {Favourites, RemoveFromFavourites} = useAppContext()

return (
    <div className='Favourite' >
        {
        (Favourites.length > 0) ?  
        Favourites.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(Item.idMeal)} >Remove from Favourites</button>
            </div>
            )
        }) : <h2 className='Failure'>No Favourites Found.</h2>
        }
    </div>
)
}

export default Favourites