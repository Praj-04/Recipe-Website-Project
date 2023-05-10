import React, { useEffect } from "react";
import "./SingleRecipe.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../redux/slices/recipeSlice";


function SingleRecipe() {
  const {recipeId} = useParams();
  const dispatch = useDispatch();

  const oneRecipe = useSelector((state) => state.recipeReducer?.oneRecipe);

  useEffect(() => {
    dispatch(getOneRecipe(`${recipeId}`))
  }, [recipeId, dispatch]);

  


  return (
    <div className="SingleRecipe">
      <h1>{oneRecipe?.recipeName}</h1>

      <div className="top-section">
        <div className="image-section">
          <img
            className="recipe-image"
            src={oneRecipe?.recipeImage?.url}
            alt="Image of the recipe"
          />
        </div>
        <div className="tiny-section">
        <p className="styleIt-desc">{oneRecipe?.description}</p>
          <div className="together">
            <p>Cooking Time :  {oneRecipe?.cookingTime}</p>
            <p>Category : {oneRecipe?.category}</p>
            <p>Type: {oneRecipe?.type}</p>
          </div>

          
        </div>

        <div className="mid-section">
          <p className="style-it">
            Ingredients : 
            <ol>
            {oneRecipe?.ingredients.map(item => (
              <li>{item}</li>
             )

            )}
              </ol>
          </p>
        </div>


        <div className="mid-section">
        <p className="style-it">
          Steps : 
          <ol>
            {oneRecipe?.steps.map(item => (
              <li>{item}</li>
             )

            )}
              </ol>
        </p>
      </div>
      </div>

      <div className="video-style">
        <p className="style-video">Watch the video here</p>
        <iframe
                        width="400px"
                        height="300px"
                        src={oneRecipe?.recipeVideo}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
      </div>

    </div>
  );
}

export default SingleRecipe;
