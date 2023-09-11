import React, { useEffect } from 'react';
import { useAppContext } from '../Context/AppContext';
import { useState } from 'react';
import { Link  } from 'react-router-dom';
import "../Popular/Popular.css";

const Popular = () => {

    const {Favourites, AddToFavourites, RemoveFromFavourites} = useAppContext()
    const [Popular, setPopular] = useState([])

    useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`) 
    .then(response => response.json())
    .then(data => {
        setPopular(data.meals)
    } )
    .catch(err => console.error(err));
    },[])

    const FavouritesChecker = (idMeal) => {
        const Check = Favourites.some((Item) => Item.idMeal === idMeal) 
        return Check
    }


return (
<div className='Popular' >

    <h3>Popular Recipes</h3>
    { 
    Popular.map((Item) => {
        return(
            <div key={Item.idMeal} >
                <figure>
                    <Link className='Link' to={`/${Item.idMeal}`}> 
                        <img src={Item.strMealThumb} alt="" />
                    </Link>
                    <figcaption>
                        <h2>{Item.strMeal} <span>({Item.strArea})</span> </h2>
                        <h4>Ingredients</h4>
                        <div>
                            <ul>
                                {Item.strIngredient1 ? (<li>{Item.strIngredient1} : {Item.strMeasure1}</li>) : null}
                                {Item.strIngredient2 ? (<li>{Item.strIngredient2} : {Item.strMeasure2}</li>) : null}
                                {Item.strIngredient3 ? (<li>{Item.strIngredient3} : {Item.strMeasure3}</li>) : null}
                                {Item.strIngredient4 ? (<li>{Item.strIngredient4} : {Item.strMeasure4}</li>) : null}
                                {Item.strIngredient5 ? (<li>{Item.strIngredient5} : {Item.strMeasure5}</li>) : null}
                                
                            </ul>
                            <ul>
                                {Item.strIngredient6 ? (<li>{Item.strIngredient6} : {Item.strMeasure6}</li>) : null}
                                {Item.strIngredient7 ? (<li>{Item.strIngredient7} : {Item.strMeasure7}</li>) : null}
                                {Item.strIngredient8 ? (<li>{Item.strIngredient8} : {Item.strMeasure8}</li>) : null}
                                {Item.strIngredient9 ? (<li>{Item.strIngredient9} : {Item.strMeasure9}</li>) : null}
                                {Item.strIngredient10 ? (<li>{Item.strIngredient10} : {Item.strMeasure10}</li>) : null}
                            </ul>
                            <ul>
                                {Item.strIngredient11 ? (<li>{Item.strIngredient11} : {Item.strMeasure11}</li>) : null}
                                {Item.strIngredient12 ? (<li>{Item.strIngredient12} : {Item.strMeasure12}</li>) : null}
                                {Item.strIngredient13 ? (<li>{Item.strIngredient13} : {Item.strMeasure13}</li>) : null}
                                {Item.strIngredient14 ? (<li>{Item.strIngredient14} : {Item.strMeasure14}</li>) : null}
                                {Item.strIngredient15 ? (<li>{Item.strIngredient15} : {Item.strMeasure15}</li>) : null}
                                {Item.strIngredient16 ? (<li>{Item.strIngredient16} : {Item.strMeasure16}</li>) : null}
                            </ul>
                        </div>
                        {
                        FavouritesChecker(Item.idMeal) ? (
                            <button onClick={() => RemoveFromFavourites(Item.idMeal)} >Remove from Favourites</button>
                        ) : (
                            <button onClick={() => AddToFavourites(Item)} >Add to Favourites</button>
                        )
                        }
                    </figcaption>
                </figure>
            </div>
        )
    })
    }
</div>
)
}

export default Popular