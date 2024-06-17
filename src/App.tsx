import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeDetails /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeDetails /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="*" element={ <h1>not found</h1> } />
    </Routes>

  );
}

export default App;
