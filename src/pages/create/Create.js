import { useRef, useState } from 'react';
import './Create.css';
import { useHistory } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

export default function Create() {
  const initalFormData = {
    title: '',
    method: '',
    cookingTime: '',
    ingredients: [],
  };

  const [formData, setFormData] = useState(initalFormData);
  const [ingredient, setIngredient] = useState('');
  const ingredientRef = useRef(null);
  const history = useHistory();

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const doc = {
        ...formData,
        cookingTime: formData.cookingTime + ' minutes',
      };

      await projectFirestore.collection('recipes').add(doc);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    const ing = ingredient.trim().toLowerCase();

    if (ing) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [...new Set([...prevFormData.ingredients, ing])],
      }));
    }
    setIngredient('');
    ingredientRef.current.focus();
  };

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor='title'>Recipe title:</label>
          <input
            name='title'
            id='title'
            type='text'
            onChange={handleFormChange}
            value={formData.title}
            required
          />
        </span>
        <span>
          <label htmlFor='ingredients'>Recipe ingredients:</label>
          <div className='ingredients'>
            <input
              name='ingredients'
              id='ingredients'
              type='text'
              onChange={(event) => setIngredient(event.target.value)}
              value={ingredient}
              ref={ingredientRef}
            />
            <button
              className='btn ingredients-btn'
              onClick={handleAddIngredient}
            >
              add
            </button>
          </div>
        </span>
        <p>
          Current ingredients:{' '}
          {formData.ingredients.map((ingr) => (
            <em key={ingr}>{ingr}, </em>
          ))}
        </p>
        <span>
          <label htmlFor='method'>Recipe method:</label>
          <textarea
            name='method'
            id='method'
            onChange={handleFormChange}
            value={formData.method}
            required
          />
        </span>
        <span>
          <label htmlFor='cookingTime'>Cooking time (minutes):</label>
          <input
            name='cookingTime'
            id='cookingTime'
            onChange={handleFormChange}
            value={formData.cookingTime}
            required
            type='number'
          />
        </span>
        <button className='btn' type='submit'>
          submit
        </button>
      </form>
    </div>
  );
}
