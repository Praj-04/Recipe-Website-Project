import React, { useEffect, useState } from "react";
import "./EditRecipe.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editRecipe, getOneRecipe } from "../../redux/slices/recipeSlice";

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  //  console.log(`the recipeID received in edit is: ${recipeId}`);
  const dispatch = useDispatch();
  const oneRecipe = useSelector((state) => state.recipeReducer?.oneRecipe);

  useEffect(() => {
    // console.log(`the recipe sent to thunk is :${recipeId} `);
    // dispatch(getOneRecipe(`${recipeId}`));
    dispatch(getOneRecipe(`${recipeId}`));
  }, [recipeId, dispatch]);

  const [formData, setFormData] = useState({
    recipeName: "",
    description: "",
    recipeImage: "",
    cookingTime: "",
    category: "",
    type: "",
    ingredients: [],
    steps: [],
    recipeVideo: "",
  });

  useEffect(() => {
    setFormData({
      recipeName: oneRecipe?.recipeName || "",
      description: oneRecipe?.description || "",
      recipeImage: oneRecipe?.recipeImage?.url || "",
      cookingTime: oneRecipe?.cookingTime || "",
      category: oneRecipe?.category || "",
      type: oneRecipe?.type || "",
      ingredients: oneRecipe?.ingredients || [],
      steps: oneRecipe?.steps || [],
      recipeVideo: oneRecipe?.recipeVideo || "",
    });
  }, [oneRecipe]);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(e) {
    e.preventDefault();
    const { name } = e.target;
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        const value1 = fileReader.result;
        setFormData({ ...formData, [name]: value1 });
        // setFormData(`{...formData, ${fileReader.result}}`)
      }
    };
  }

  function handleIngredientsChange(event, index) {
    event.preventDefault();
    const { value } = event.target;
    const ingredients = [...formData.ingredients];
    ingredients[index] = value;
    setFormData({ ...formData, ingredients });
  }

  function handleRemoveIngredient(event, index) {
    event.preventDefault();
    const ingredients = [...formData.ingredients];
    ingredients.splice(index, 1);
    setFormData({ ...formData, ingredients });
  }

  function handleAddIngredient(event) {
    event.preventDefault();
    const ingredients = [...formData.ingredients, ""];
    setFormData({ ...formData, ingredients });
  }
  function handleStepChange(event, index) {
    event.preventDefault();
    const { value } = event.target;
    const steps = [...formData.steps];
    steps[index] = value;
    setFormData({ ...formData, steps });
  }

  function handleRemoveStep(event, index) {
    event.preventDefault();
    const steps = [...formData.steps];
    steps.splice(index, 1);
    setFormData({ ...formData, steps });
  }

  function handleAddStep(event) {
    event.preventDefault();
    const steps = [...formData.steps, ""];
    setFormData({ ...formData, steps });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    await dispatch(editRecipe({ ...formData, recipeId }));
    window.confirm("Recipe is saved")
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/edit/${recipeId}`); //added this line so that the edit changes is displayed as you save in edit page
     dispatch(getOneRecipe(`${recipeId}`))
      // setFormData({
      //   recipeName:  "",
      //   description:"",
      //   recipeImage: "",
      //   cookingTime:  "",
      //   category:  "",
      //   type: "",
      //   ingredients:[],
      //   steps: [],
      //   recipeVideo: "",
      // });

    }
  }

  return (
    <div className="EditRecipe container-width">
      <h2>EDIT RECIPE</h2>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="individual-fields">
          <div className="each-field">
            <label className="label-style" htmlFor="recipeName">
              Recipe Name :{" "}
            </label>
            <input
              id="recipeName"
              name="recipeName"
              className="input-style"
              type="text"
              value={formData.recipeName}
              onChange={handleChange}
            />
          </div>

          <div className="each-field">
            <label className="label-style" htmlFor="description">
              Recipe Description :
            </label>
            {/* <input className="input-style" type="text" name="desc" /> */}
            <textarea
              id="description"
              name="description"
              cols="30"
              rows="2"
              value={formData.description}
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
              name="cookingTime"
              id="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
            />
          </div>

          <div className="each-field">
            <label className="label-style">Recipe Image :</label>
            <label className="label-style extrastyle" htmlFor="recipeImage">
              <img src={formData?.recipeImage} alt="recipeImage" />
            </label>
            <input
              className="input-style hover-link hide"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="recipeImage"
              id="recipeImage"
            />
          </div>

          <div className="each-field">
            <label className="label-style" htmlFor="recipeVideo">
              Youtube Video URL :
            </label>
            <input
              className="input-style"
              type="text"
              name="recipeVideo"
              id="recipeVideo"
              value={formData.recipeVideo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="drop-downs">
          <div className="each-field">
            <label htmlFor="category">Category :</label>
            <select
              className="hover-link"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="breakfast">Breakfast</option>
              <option value="main-course">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="beverage">Beverages</option>
            </select>
          </div>

          <div className="each-field">
            <label htmlFor="type">Type :</label>
            <select
              className="hover-link"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
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
            {formData.ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  className="input-style1 space"
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientsChange(event, index)}
                />
                <button
                  className="hover-link space"
                  onClick={(event) => handleRemoveIngredient(event, index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button className="hover-link space" onClick={handleAddIngredient}>
              Add
            </button>
          </div>

          <div className="right-part">
            <label htmlFor="steps">Steps : </label>
            {formData.steps.map((step, index) => (
              <div key={index}>
                <input
                  className="input-style1 space"
                  type="text"
                  name="steps"
                  id="steps"
                  value={step}
                  onChange={(event) => handleStepChange(event, index)}
                />
                <button
                  className="hover-link space"
                  onClick={(event) => handleRemoveStep(event, index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="hover-link space "
              onClick={(event) => handleAddStep(event)}
            >
              Add
            </button>
          </div>
        </div>

        <div className="edit-button-style">
          <input
            className="edit-button hover-link"
            type="submit"
            value="Save"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;
