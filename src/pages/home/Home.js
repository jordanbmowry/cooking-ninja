import { projectFirestore } from '../../firebase/config';
import { useEffect } from 'react';
import { useState } from 'react';
// styles
import './Home.css';
// components
import RecipeList from '../../components/RecipeList';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsubscribe = projectFirestore.collection('recipes').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load');
        } else {
          let results = [];

          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
