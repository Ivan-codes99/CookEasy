const User = require('../models/userModel');
/* 
 !if the user is not found it returns "message": 
 !"Cast to ObjectId failed for value \"67af9c95652b7c25f1cb7e8eeee\" (type string) at path \"_id\" for model \"users\""
*/
/*
  TODO //?changeCategoryName
  TODO toggleCategoryExcluded
  TODO Add ingredient, category should always be specified, Uncategorized is a category 
  TODO Implement batch merging logic
       ?Should user be able to have the same ingredient in different categories?
*/

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

  const deleteCategory = async (req, res) => { //We just need _id, and category
    let {_id, category} = req.body;
  
    try {
      const user = await User.findById(_id);
      
      if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
  
      //* This ideally would never evaluate to true
      if (!user.kitchenStock.has(category)) { //checking category exists
        return res.status(400).json({ message: `Category ${category} doesn't exist in kitchen stock` });
      } 
  
      user.kitchenStock.delete(category);
      await user.save();
      res.status(200).json({ message: `Category: ${category} deleted from kitchen stock successfully supposedly lol`});
  
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  
  }

  const toggleCategoryExcluded = async (req, res) => { //we just need _id, and category
    let {_id, category} = req.body;
  
    try {
      const user = await User.findById(_id);
      if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
      
      state = user.kitchenStock.get(category);
      user.kitchenStock.get(category).exclude = !state;
  
      await user.save();
      res.status(200).json({ message: `Category: ${category} exclusion status set to ${!state} successfully supposedly lol` });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  module.exports = { addCategory, deleteCategory, toggleCategoryExcluded };