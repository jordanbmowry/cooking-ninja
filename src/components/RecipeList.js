import './RecipeList.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trash-can.svg';
import { projectFirestore, projectFireStore } from '../firebase/config';

export default function RecipeList(props) {
  const { mode } = useTheme();

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete();
  };
  if (!props.recipes.length) {
    return <div className='error'>No recipes to load...</div>;
  }
  return (
    <div className='recipe-list'>
      {props.recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className='delete'
            src={Trashcan}
            alt='trash can svg'
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
