const router = require("express").Router();
const recipesController = require("../controllers/recipesController");
const requireUser = require("../middlewares/requireUser");

router.post("/create", requireUser, recipesController.createRecipeController);
router.put("/update", requireUser, recipesController.editRecipeController);
router.delete("/delete/:recipeId", requireUser, recipesController.deleteRecipeController);
router.get("/one/:recipeId",  recipesController.getARecipeController);
router.get("/all", requireUser, recipesController.getAllRecipesController);
router.get("/public", recipesController.getPublicRecipesController);

module.exports = router;
