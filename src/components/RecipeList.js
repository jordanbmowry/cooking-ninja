import './RecipeList.css';
import { Link } from 'react-router-dom';

export default function RecipeList(props) {
  return (
    <div className='recipe-list'>
      {props.recipes.map((recipe) => (
        <div className='card' key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
