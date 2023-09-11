import React, { useState, useEffect, } from 'react';
import "../RecipeIndex/RecipeIndex.css";
// import {FaHandPointDown} from "react-icons/fa"
import { Link  } from 'react-router-dom';
import { useAppContext } from '../../Components/Context/AppContext';

const RecipeIndex = () => {

    const RecipeState = () => {
        let Record = localStorage.getItem("Records");

        if (Record) {
            return JSON.parse(localStorage.getItem("Records"))
        } else {
            return [];
        }
    }

    const {Favourites, AddToFavourites, RemoveFromFavourites} = useAppContext()
    const [url, seturl] = useState("")
    const [Items, setItems] = useState(RecipeState()) 

    const Alphabets = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    var num = 0;

    const setIndex = (Alphabets)=> {
        seturl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Alphabets}`);
        getMeals()
    }

    const getMeals = () => {
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setItems(data.meals)
        })
        .catch(err => console.error(err));
    }

    const FavouritesChecker = (idMeal) => {
        const Check = Favourites.some((Item) => Item.idMeal === idMeal) 
        return Check
    }

    useEffect(() => {
        localStorage.setItem("Records", JSON.stringify(Items))
    },[Items]);


return (
    <div className='RecipeIndex' >
        <section>
            <h1>
                Explore your creativity.
            </h1>
            <h3>
                If plan A doesn't work, the alphabet has 25 more letters.
            </h3>
            <h5>Double click on any of the letters below <i class="fa-solid fa-hand-point-down"></i> </h5>
        </section>
        <section>
            {
            Alphabets.map((Alphabet) => {
                return (
                    <div key={num++} onClick={()=>setIndex(Alphabet)} >
                        <h3>{Alphabet}</h3>
                    </div>
                    
                )
            })
            } 
        </section>
        <section>
            {
            (!Items) ? <h2 className='Failure' >No Results Found</h2> :
            Items.map((Item) => {
                return (
                <div key={Item.idMeal}  >
                    <Link className='Link' to={`/${Item.idMeal}`} >
                        <figure>
                            <img src={Item.strMealThumb} alt="" />
                            <figcaption>
                                <h2>{Item.strMeal}</h2>
                            </figcaption>
                        </figure>
                    </Link>
                    {
                        FavouritesChecker(Item.idMeal) ? (
                            <button onClick={() => RemoveFromFavourites(Item.idMeal)} >Remove from Favourites</button>
                        ) : (
                            <button onClick={() => AddToFavourites(Item)} >Add to Favourites</button>
                        )
                    }
                </div>
                )
            })
            }
        </section>
    </div>
)
}

export default RecipeIndex