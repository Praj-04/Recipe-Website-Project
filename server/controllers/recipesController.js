const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const createRecipeController = async (req, res) => {
  try {
    //this req._id is the admin id we got from requireUSer when we decoded the access token. while encoding we used id to encode
    const owner = req._id;

    // we will get all the new recipe information like recipe name,image, desc etc from the req body(from front end)
    //image,recipeVideo we hardcode for now in cloudinary
    const {
      recipeName,
      description,
      cookingTime,
      ingredients,
      steps,
      category,
      type,
      recipeImage,
      recipeVideo,
    } = req.body;

    if (
      !recipeName ||
      !description ||
      !cookingTime ||
      !ingredients ||
      !steps ||
      !category ||
      !type ||
      !recipeImage ||
      !recipeVideo
    ) {
      return res.send(error(400, "All fields in the recipe are required!!"));
    }

    const cloudImg = await cloudinary.uploader.upload(recipeImage, {
      folder: "recipesImage",
    });

    const user = await User.findById(req._id);

    //we are saving the new recipe info in the mongoosedb using create
    const recipe = await Recipe.create({
      owner,
      recipeImage: {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      },
      recipeName,
      description,
      cookingTime,
      ingredients,
      steps,
      recipeVideo,
      category,
      type,
    });

    //we are also pushing the newly created recipe(recipe id we got when we created recipe in above line)
    //   into the user table.can be used in edit recipe
    user.recipes.push(recipe._id);
    await user.save();
    //  console.log("recipe created");
    return res.send(success(201, recipe));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//............................... Editing a recipe.................................................

const editRecipeController = async (req, res) => {
  try {
    const owner = req._id;

    const {
     recipeId,
      recipeImage,
      recipeName,
      description,
      cookingTime,
      ingredients,
      steps,
      recipeVideo,
      category,
      type,
    } = req.body;

    // console.log(`the recipe id in backed ${recipeId}`)

    const recipe = await Recipe.findById(recipeId);
    //  console.log(recipe) 

    if (!recipe) {
      return res.send(error(404, "Recipe not found!"));
    }

    const cloudImg = await cloudinary.uploader.upload(recipeImage, {
      folder: "recipesImage",
    });

    //only that particular user is allowed to change his recipe
    if (recipe.owner.toString() !== owner) {
      return res.send(error(200, "Only the admin can edit the recipe"));
    } else {
      recipe.recipeImage= {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      },
      recipe.recipeName = recipeName;
      recipe.description = description;
      recipe.cookingTime = cookingTime;
      recipe.ingredients = ingredients;
      recipe.steps = steps;
      recipe.recipeVideo = recipeVideo;
      recipe.category = category;
      recipe.type = type;

       await recipe.save();
      //  console.log(updatedRecipe);
      return res.send(success(200, {recipe}));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//............................... Deleting a recipe.................................................
const deleteRecipeController = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const curUserId = req._id;

    //  console.log(`{recipeId to be deleted at server : ${recipeId}}`)

    const recipe = await Recipe.findById(recipeId);
    const curUser = await User.findById(curUserId);

    if (!recipe) {
      return res.send(error(404, "Recipe not found!"));
    }
    if (recipe.owner.toString() !== curUserId) {
      return res.send(error(200, "Only the admin can delete the recipe!"));
    }

    //remove the recipe from the User table also
    const index = curUser.recipes.indexOf(recipeId);
    curUser.recipes.splice(index, 1);
    await curUser.save();
    // await recipe.remove();

    await Recipe.deleteOne(recipe);
    //  console.log(deletedRecipe);
    return res.send(success(200, "Recipe deleted successfully!"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//............................... Get one recipe.................................................
//get One recipe in the edit page when you select edit
const getARecipeController = async (req, res) => {
  try {
    const {recipeId} = req.params;
  

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.send(error(404, "Recipe not found!"));
    }
    return res.send(success(200, recipe));
    //sending one recipe
    // if (recipe.owner.toString() !== owner) {
    //   return res.send(error(404, "No Recipes Found!"));
    // } else {
     
    // }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//............................... Get all recipes.................................................
const getAllRecipesController = async (req, res) => {
  try {
    const owner = req._id;
    const allRecipes = await Recipe.find({ owner });
    return res.send(success(200, { allRecipes }));

    // return res.send(200, success("Here are all the recipes"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//............................... Get public recipes.................................................

const getPublicRecipesController = async (req, res) => {
  try {
    // const owner = req._id;
    // const allRecipes = await Recipe.find({ owner });
    // return res.send(success(200, { allRecipes }));

    //  console.log("get public recipe");
    const allRecipes = await Recipe.find();
    // console.log("fetched public recipes!");
    return res.send(success(200, { allRecipes }));

    // return res.send(200, success("Here are all the recipes"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// .................................................

module.exports = {
  createRecipeController,
  editRecipeController,
  deleteRecipeController,
  getARecipeController,
  getAllRecipesController,
  getPublicRecipesController,
};
