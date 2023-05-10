const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  owner:{ type :mongoose.Schema.Types.ObjectId , ref:'user', required:true},
  recipeImage: { publicId: String, url: String },
  recipeName: { type: String, required: true },
  description: { type: String, required: true },
  cookingTime: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  recipeVideo:{ type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  //you can add likes or comments here..for this the user may have to login from their personal email
},{timestamps:true});

module.exports = mongoose.model('recipe', recipeSchema);