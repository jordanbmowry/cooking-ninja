import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch ';
// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/recipes/${id}`);

  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && <h1>{recipe.title}</h1>}
    </div>
  );
}
