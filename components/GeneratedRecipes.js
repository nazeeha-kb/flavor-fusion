import React from 'react'
import RecipeCard from './RecipeCard'

const GeneratedRecipes = () => {
  return (
    <div className='md:mt-10 mt-14 w-full-xl'>
        <h3 className='font-semibold text-2xl'>Generated Recipes</h3>
        <div className="gen-recipes flex xl:gap-6 md:gap-4 gap-2 md:pt-5 pt-7 justify-between h-full w-full flex-wrap">
        <div className='lg:max-w-[32%] sm:max-w-[48%] w-full mb-4'><RecipeCard/></div>
        <div className='lg:max-w-[32%] sm:max-w-[48%] w-full mb-4'><RecipeCard/></div>
        <div className='lg:max-w-[32%] sm:max-w-[48%] w-full mb-4'><RecipeCard/></div>
        </div>
    </div>
  )
}

export default GeneratedRecipes