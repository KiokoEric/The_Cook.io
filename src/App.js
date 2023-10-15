import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from '../src/Pages/Home/Home';
import Recipe from '../src/Pages/Recipe/Recipe';
import Instructions from './Components/Instructions/Instructions';
import RecipeIndex from '../src/Pages/RecipeIndex/RecipeIndex';
import Categories from "../src/Pages/Categories/Categories";
import Favourites from './Pages/Favourites/Favourites';
import Nationality from './Pages/Nationality/Nationality';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Explore' element={<RecipeIndex />}/>
        <Route path='Categories' element={<Categories />}/>
        <Route path='/Recipe' element={<Recipe />} >
          <Route path=':MealId' element={<Recipe />} />
        </Route>
        <Route path='/:MealId' element={<Instructions />} />
        <Route path='/Favourites' element={<Favourites/>} />
        <Route path='/Nationality' element={<Nationality/>}/>
      </Routes>
    </div>
  );
}

export default App;
