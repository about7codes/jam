// vid-2 00:00 https://www.youtube.com/watch?v=m9mNsYJbkNg&list=PL4cUxeGkcC9jClk8wl1yJcN3Zlrr8YSA1&ab_channel=TheNetNinja
// Contentfull account : aloohamood3@gmail.com

import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps(){
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items,
      revalidate: 1
    }
  }
}

export default function Recipes({ recipes }) {
  // console.log(recipes);
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard className="item" key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>{`
      .recipe-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px 60px;
      }
      `}</style>
      
    </div>
  )
}