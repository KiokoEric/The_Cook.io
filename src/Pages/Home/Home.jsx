import React, { useState, useEffect } from 'react';
import "../Home/Home.css";
import { Link  } from 'react-router-dom';
import Popular from '../../Components/Popular/Popular';
import { useAppContext } from '../../Components/Context/AppContext';

const Home = () => {

    const SearchState = () => {
        let Value = localStorage.getItem("Values");

        if (Value) {
            return JSON.parse(localStorage.getItem("Values"))
        } else {
            return [];
        }
    }

    const {Favourites, AddToFavourites, RemoveFromFavourites} = useAppContext()
    const [Recipes, setRecipes] = useState(SearchState())
    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")

    const getRecipe = (e) => { 
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly enter a search item")
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Search}`)
            .then(response => response.json())
            .then((data) => {
                setSearchError("")
                setRecipes(data.meals)
                setSearch("")
            })
            .catch(err => console.error(err));
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const FavouritesChecker = (idMeal) => {
        const Check = Favourites.some((Recipe) => Recipe.idMeal === idMeal) 
        return Check
    }

    useEffect(() => {
        localStorage.setItem("Values", JSON.stringify(Recipes))
    },[Recipes]);

return (
    <div className='Home'> 
        <section className='SearchPage' >
            <h1>Your desired dish ?</h1>
            <form onSubmit={getRecipe} >
                <i id='Utensils' class="fa-solid fa-utensils"></i>
                <input type="text" placeholder="Search Recipes..." value={Search} onChange={handleSearch} />
                <i onClick={getRecipe} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form> 
            <span>{SearchError}</span>
            <p>Search any recipe e.g burger, pizza, sandwich</p>
            <p>Results for your search will be displayed below the popular recipes section.</p>
        </section>
        <section>
            <Popular />  
        </section> 
        <section className='SearchResults' >
            {
            (!Recipes) ? <h2 className='Failure' >No Results Found</h2> :
            Recipes.map((Recipe) => {
            return (
                <div key={Recipe.strMeal}  >
                    <section>
                        <Link className='Link' to={`Recipe/${Recipe.strMeal}`} >
                            <figure>
                                <img src={Recipe.strMealThumb} alt="" />
                                <figcaption>
                                    <h2>{Recipe.strMeal}</h2>
                                </figcaption>
                            </figure>
                        </Link>
                    </section>
                    <section>
                        {
                        FavouritesChecker(Recipe.idMeal) ? (
                            <button onClick={() => RemoveFromFavourites(Recipe.idMeal)} >Remove from Favourites</button>
                        ) : (
                            <button onClick={() => AddToFavourites(Recipe)} >Add to Favourites</button>
                        )
                        }
                    </section>
                </div>
            )
            })} 
        </section>
    </div>
)
}

export default Home