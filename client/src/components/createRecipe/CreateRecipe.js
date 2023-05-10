import React, { useState } from "react";
import "./CreateRecipe.scss";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

function CreateRecipe() {

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    recipeImage: " ",
    recipeName: "",
    description: "",
    cookingTime: "",
    ingredients: [],
    steps: [],
    recipeVideo: "",
    category: "",
    type: "",
  });

  function handleImageChange(e) {
    e.preventDefault();
    const {name} = e.target;
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        const value = fileReader.result
        setFormData({...formData, [name]: value});
      }
    };
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target; //name= e.target.name , value= e.target.value
    setFormData({ ...formData, [name]: value }); // along with values we already set for variables in feedData(eg:name,time) we add new one..[description]:"abcdg" => {description : "abcdg"}
  }


  function handleIngredientsChange(event,index){
    event.preventDefault();
const {value} = event.target;
const ingredients = [...formData.ingredients];
ingredients[index] = value;
setFormData({...formData, ingredients})
  }

  function handleRemoveIngredient(e,index){
    e.preventDefault();
const ingredients = [...formData.ingredients];
ingredients.splice(index,1);
setFormData({...formData,ingredients});
  }

  function handleAddIngredient(e){
    e.preventDefault();
    const ingredients = [...formData.ingredients , ""]
    setFormData({...formData ,ingredients})
  }

  function handleStepChange(event,index){
    const {value}= event.target;
    const steps = [...formData.steps];
    steps[index] = value;
    setFormData({...formData,steps})
  }

  function handleRemoveStep(e,index){
    e.preventDefault();
    const steps = [...formData.steps]
    steps.splice(index,1)
    setFormData({...formData,steps})
  }

  function handleAddStep(e){
    e.preventDefault();
    const steps = [...formData.steps," "]
    setFormData({...formData,steps})

  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      //  console.log({...formData})
   await axiosClient.post('/recipes/create',{
        ...formData
      });
           
        window.confirm("Recipe is created")
        navigate('/')
      
     
      
    } catch (e) {
      console.log(e)
    }finally{
      dispatch(setLoading(false))
    }

  }

  return (
    <div className="CreateRecipe container-width">
      <h2>CREATE RECIPE</h2>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="individual-fields">
          <div className="each-field">
            <label className="label-style" htmlFor="recipeName">
              Recipe Name :{" "}
            </label>
            <input
              className="input-style"
              type="text"
              id="recipeName"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleChange}
            />
          </div>

          <div className="each-field">
            <label className="label-style" htmlFor="description">
              Recipe Description :
            </label>
            <textarea
              cols="30"
              rows="2"
              name="description"
              value={formData.description}
              id="description"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="each-field">
            <label className="label-style" htmlFor="cookingTime">
              Cooking Time :{" "}
            </label>
            <input
              className="input-style"
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
            />
          </div>

          <div className="each-field">
            <label className="label-style">Recipe Image :</label>

            <label className="label-style extrastyle" htmlFor="recipeImage">
              <img src={formData?.recipeImage} alt="Click To Add Image" />
            </label>
            <input
              className="input-style hover-link hide"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="recipeImage"
              name="recipeImage"
            />
          </div>

          <div className="each-field">
            <label className="label-style" htmlFor="recipeVideo">
              Youtube Video URL :
            </label>
            <input className="input-style" type="text" id="recipeVideo" name="recipeVideo" onChange={handleChange} value={formData.recipeVideo}/>
          </div>
        </div>

        <div className="drop-downs">
          <div className="each-field">
            <label htmlFor="category">Category :</label>
            <select className="hover-link" id="category" name="category" onChange={handleChange} value={formData.category}>
              <option value="breakfast">Breakfast</option>
              <option value="main-course">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="beverage">Beverages</option>
            </select>
          </div>

          <div className="each-field">
            <label htmlFor="type">Type :</label>
            <select className="hover-link" name="type" id="type" onChange={handleChange} value={formData.type}>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-veg</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
            </select>
          </div>
        </div>



        <div className="steps">
          <div className="left-part">
            <label htmlFor="ingredients">Ingredients : </label>
            {formData?.ingredients?.map((ingredient, index) => (
            <div key={index}>
              <input
                className="input-style1 space"
                type="text"
                id="ingredients"
                name="ingredients"
                value={ingredient}
                onChange={(event)=>handleIngredientsChange(event,index)}

              />
              <button className="hover-link space" onClick={(e)=> handleRemoveIngredient(e,index)}>Remove</button>
            </div>
          ))}

            <button className="hover-link space" onClick={handleAddIngredient}>Add</button>
          </div>




          <div className="right-part">
            <label htmlFor="steps">Steps : </label>
            {formData?.steps?.map((step, index) => (
            <div key={index}>
              <input className="input-style1 space" type="text" id="steps" name="steps" value={step} onChange={(event)=>handleStepChange(event,index)}/>

              <button className="hover-link space" onClick={(e)=> handleRemoveStep(e,index)}>Remove</button>
            </div>
            ))}

            <button className="hover-link space " onClick={(e)=> handleAddStep(e)}>Add</button>
          </div>
        </div>

        <div className="create-button-style">
          <input
            className="create-button hover-link"
            type="submit"
            value="Create"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
