import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsubscribe = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError('Could not find that recipe');
        }
      });
    return () => unsubscribe();
  }, [id]);

  const handleUpdate = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different',
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Take {recipe.cookingTime}</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleUpdate}>Update me</button>
        </>
      )}
    </div>
  );
}
