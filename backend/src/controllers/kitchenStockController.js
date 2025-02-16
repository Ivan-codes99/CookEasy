const User = require('../models/userModel');
/* 
 !if the user is not found it returns "message": 
 !"Cast to ObjectId failed for value \"67af9c95652b7c25f1cb7e8eeee\" (type string) at path \"_id\" for model \"users\""
*/
/*
  TODO addCategory
  TODO deleteCategory
  TODO addBatch
  TODO deleteBatch (low priority for now)
  TODO other batch methods (low priority for now)
  TODO toggleCategoryExcluded
  TODO toggleIngredientExcluded
  TODO getEarliestExpiringBatch
  TODO Add ingredient, category should always be specified, Uncategorized is a category
  TODO Add expirationDate to a batch, 
  TODO Implement batch merging logic
       ?Should user be able to have the same ingredient in different categories?
*/

/**
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

  const addCategory = async (req, res) => { //We just need _id, and category
    let {_id, category} = req.body;
  
    try {
      const user = await User.findById(_id);
      
      if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
  
      
      if (user.kitchenStock.has(category)) { //checking category exists
        return res.status(400).json({ message: `Category ${category} already exists in kitchen stock` });
      } 
  
      user.kitchenStock.set(category, {});
      await user.save();
      res.status(200).json({ message: `Category: ${category} added to kitchen stock successfully supposedly lol`});
  
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  
  }

/**
 * Delete ingredient endpoint
 */
const deleteIngredient = async (req, res) => { //* Decreases ingredient quantity
    let { _id, name, quantity } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if ingredient already exists in kitchen stock
        if (user.kitchenStock.has(name)) {
            let existingIngredient = user.kitchenStock.get(name);

            if (existingIngredient.quantity < quantity) {
                return res.status(400).json({ message: "Can't delete more ingredient quantity than what you have" });
            }

            existingIngredient.quantity = Math.max(0, existingIngredient.quantity - quantity);
            await user.save();
            return res.status(200).json({ message: "Ingredient deleted successfully", ingredient: existingIngredient });
        }

        // This should never be reached
        return res.status(400).json({ message: "Deleting ingredient that user doesn't have. This shouldn't happen." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get ingredient stock endpoint
 */

//*example url http://localhost:5000/ingredient/get-ingredient?_id=60d0fe4f5311236168a109ca&name=tomato
//* I don't think this endpoint will be necessary in the actual app tbh
const getIngredient = async (req, res) => {
    let { _id, name } = req.query;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if ingredient exists in kitchen stock
        if (user.kitchenStock.has(name)) {
            let existingIngredient = user.kitchenStock.get(name);
            return res.status(200).json({ message: "Ingredient found successfully", ingredient: existingIngredient });
        }

        // If ingredient is not found in kitchen stock
        return res.status(404).json({ message: "Ingredient not found in kitchen stock" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get all ingredients in kitchen stock endpoint
 */
const getAllIngredients = async (req, res) => {
    let { _id } = req.query;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Convert Map to an object to send in JSON response
        const kitchenStock = Object.fromEntries(user.kitchenStock);

        return res.status(200).json({ message: "Ingredients retrieved successfully", kitchenStock });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addIngredient, addCategory, deleteIngredient, getIngredient, getAllIngredients };
