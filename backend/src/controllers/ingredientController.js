const User = require('../models/userModel')

/*
  TODO toggleIngredientExcluded
       ?Should user be able to have the same ingredient in different categories?
*/

/*
 * Add ingredient endpoint
 */
const addIngredient = async (req, res) => { //We just need _id, category, and ingredient
    let {_id, category, ingredient} = req.body;
  
    try {
      const user = await User.findById(_id);
      
      if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
  
      //*This should never really happen. In the app the user should add an ingredient under a Category/Food Group tab
      if (!user.kitchenStock.has(category)) {//checking category exists
        return res.status(400).json({ message: `Category ${category} does not exist in kitchen stock` });
      } 
  
      const categoryMap = user.kitchenStock.get(category);
      if (categoryMap.ingredients.has(ingredient)) { //checking ingredient exists
        return res.status(400).json({ message: `Ingredient ${ingredient} already exists, create new batch instead`})
      }
      else {
        categoryMap.ingredients.set(ingredient, {}) //adding ingredient
      }
      await user.save();
      res.status(200).json({ message: `Ingredient: ${ingredient} added to ${category} successfully supposedly lol`});
  
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  
  }

/*
 * Delete ingredient endpoint
 */
const deleteIngredient = async (req, res) => { //* deletes ingredient
    let { _id, category, ingredient } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if category exists in kitchen stock
        if (!user.kitchenStock.has(category)) return res.status(404).json({ message: "Category not found" }); //should never happen irl
        let ingredientMap = user.kitchenStock.get(category).ingredients;
        // Check if ingredient exists in category
        if (!ingredientMap.has(ingredient)) return res.status(404).json({ message: "Ingredient not found" }); //should never happen irl

        ingredientMap.delete(ingredient);
        return res.status(200).json({ message: `Deleted ${ingredient} from ${category}` });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {addIngredient, deleteIngredient};