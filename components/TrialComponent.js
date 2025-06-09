'use client';
import React, { useState } from 'react';

const TrialComponent = () => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerate = async () => {
    const ingredientArray = ingredients.split(',').map(item => item.trim());
    if (ingredientArray.length === 0) return;

    setLoading(true);
    setRecipe(''); // clear previous
    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientArray }),
      });

      const data = await res.json();
      setRecipe(data.recipe);
      setShowPopup(true);
    } 
    
    catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">AI Recipe Generator</h1>
      <input
        type="text"
        placeholder="Enter ingredients separated by commas"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded max-w-xl">
            <button
              onClick={() => setShowPopup(false)}
              className="text-red-500 mb-2"
            >
              Close
            </button>
            <pre className="whitespace-pre-wrap">{recipe}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrialComponent