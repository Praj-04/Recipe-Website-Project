import React, { useEffect, useState } from "react";
import "./Recipes.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes,getPublicRecipes } from "../../redux/slices/recipeSlice";

function Recipes() {
  const navigate = useNavigate();
  const dispatch =  useDispatch()
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
const [search,setSearch]= useState("");

  useEffect(()=>{
    dispatch(getPublicRecipes())
  },[])
  const myRecipes = useSelector((state) => state.recipeReducer?.publicRecipes);
  // console.log(`the public recipes are ${myRecipes}`);


  const filteredData = myRecipes.filter((recipe) => {
    if (categoryFilter && recipe.category !== categoryFilter) {
      // window.confirm("No matches found")
        return false;
    }
    if (cuisineFilter && recipe.type !== cuisineFilter) {
      // window.confirm("No matches found")
        return false;
    }
    if(search && !recipe.recipeName.toLowerCase().includes(search.toLowerCase())){
      return false;
    }
    return true;
});

 
  return (
    <div className="Recipes">
      <div className="filter-component">
       
          <label htmlFor="filter">Category

          <select   value={categoryFilter} onChange={(e)=> setCategoryFilter(e.target.value)}>
          <option value="">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="main-course">Main course</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="beverage">Beverages</option>
            </select>
            </label>

            <label > Type:
            <select value={cuisineFilter}
                        onChange={(e) => setCuisineFilter(e.target.value)}
                    >
                
                <option value="">All</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-veg</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
            </select>
            </label>
            <input className="search-bar" type="text" placeholder="search..."  value={search} onChange={(event)=>setSearch(event.target.value)} />
          
      </div>

      <div className="container">
        {filteredData?.map((recipe,index) => {
          
          return (
            <div className="block" key={index} onClick={() => navigate(`/recipe/${recipe?._id}`)}>
              <img
                className="style-img"
                src={recipe?.recipeImage?.url}
                alt="Image of recipe"
              />
              <h3 className="recipe-name">{recipe.recipeName}</h3>
              <h5 className="recipe-desc">{recipe.description}</h5>
              {/* <h6
                className="click-here"
                onClick={() => navigate("/recipe/:abcd")}
              >
                View full recipe...
              </h6> */}
            </div>
          );
        })}

        
      </div>
    </div>
  );
}

export default Recipes;
