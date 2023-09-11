import React, { useState, useEffect } from 'react';
import "../Categories/Categories.css";
import { Link  } from 'react-router-dom';
import { useAppContext } from '../../Components/Context/AppContext';

const Categories = () => {

    const CategoryState = () => {
        let Category = localStorage.getItem("Results");

        if (Category) {
            return JSON.parse(localStorage.getItem("Results"))
        } else {
            return [];
        }
    }

    const {Favourites, AddToFavourites, RemoveFromFavourites} = useAppContext()
    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")
    const[Categories, setCategories] = useState(CategoryState())

    const getCategory =(e)=> { 
        e.preventDefault()

        if(Search === ""){  
            setSearchError("Kindly enter a search category")
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Search}`)
            .then(response => response.json())
            .then((data) => {
                setSearchError("")
                setCategories(data.meals)
                setSearch("")
            })
            .catch(err => console.error(err)); 
        }
    }

    const FavouritesChecker = (idMeal) => {
        const Check = Favourites.some((Category) => Category.idMeal === idMeal) 
        return Check
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem("Results", JSON.stringify(Categories))
    },[Categories]);

return (
    <div className='Category' >
        <section>
        <h1>Enter a category?  </h1>
            <form onSubmit={getCategory} >
                <i id='World' class="fa-solid fa-earth-americas"></i>
                <select name="" id="Select" value={Search} onChange={handleSearch} >
                    <option value="">Search among the categories below</option>
                    <option value="Beef">Beef</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Goat">Goat</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Pork">Pork</option>
                    <option value="Seafood">SeaFood</option>
                    <option value="Side">Side</option>
                    <option value="Starter">Starter</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                </select>
                <i onClick={getCategory} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form>
            <span>{SearchError}</span>
        </section>
        <section>
            {
            (!Categories) ? <h2 className='Failure' >No Results Found</h2> :
            Categories.map((Category) => {
                return (
                    <div key={Category.idMeal} >
                        <Link className='Link' to={`/${Category.idMeal}`}  > 
                            <div >
                                <figure>
                                    <img src={Category.strMealThumb} alt="" />
                                    <figcaption>
                                        <h2>{Category.strMeal}</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </Link>
                        {
                        FavouritesChecker(Category.idMeal) ? (
                            <button onClick={() => RemoveFromFavourites(Category.idMeal)} >Remove from Favourites</button>
                        ) : (
                            <button onClick={() => AddToFavourites(Category)} >Add to Favourites</button>
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

export default Categories