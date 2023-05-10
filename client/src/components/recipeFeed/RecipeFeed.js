import React, { useEffect, useState } from "react";
import "./RecipeFeed.scss";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getAllRecipes } from "../../redux/slices/recipeSlice";

function RecipeFeed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myRecipes = useSelector((state) => state.recipeReducer?.recipes);
  //  console.log(`the recipes are ${myRecipes}`);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
const [search,setSearch]= useState("");

  useEffect(()=>{
    dispatch(getAllRecipes())
  },[dispatch])


  

 async function handleDelete(e,recipeId){
e.preventDefault();
try {

  if(
    window.confirm("Are you sure you want to delete this recipe?")
  ){
    // console.log(`{recipeId to be deleted : ${recipeId}}`)
    await dispatch(deleteRecipe(recipeId))
    dispatch(getAllRecipes());
  }

} catch (error) {
  console.log(error);
}

  }


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
    <div className="RecipeFeed container-width">
      <div className="top-part">
        <div className="filter-component">
            <label htmlFor="filter">Category: 

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
      </div>

      <div className="bottom-part">
        {filteredData?.map((recipe) => {
          // console.log(`the recipe id sent is :${recipe?._id} `)
          return (
            <div  key={recipe?._id} className="recipe-single-line">
              <h4 className="style-heading">{recipe?.recipeName}</h4>
              <img
                className="mini-recipeImage"
                src={recipe?.recipeImage?.url}
                alt="recipe image"
              />
              <p
                className="hover-link edit-recipe "
                onClick={() => navigate(`/edit/${recipe?._id}`)}
              >
                Edit
              </p>
              <RiDeleteBin5Fill
                style={{ color: "rgb(179, 28, 28)" }}
                className="hover-link" onClick={(e)=> handleDelete(e,recipe._id)}
              />
            </div>
          );
        })}

      
      </div>
    </div>
  );
}

export default RecipeFeed;
