const User = require('../models/userModel');

/* 
  TODO addBatch
  TODO deleteBatch (low priority for now)
  TODO other batch methods (low priority for now 
  TODO figure out batch merging logic
  */

  //* Not gonna check if category or ingredient exists at least for now, since irl that shouldn't happen
  const addBatch = async (req, res) => { //We just need _id, category, ingredient
     let {_id, category, ingredient, batch} = req.body;
     category = category //have to do this for some reason
     try {
       const user = await User.findById(_id);
       if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
     
       user.kitchenStock.category.ingredients.ingredient.batches.push(batch);
       await user.save();
       res.status(200).json({ message: `New ${ingredient} batch added to kitchen stock successfully supposedly lol`});
   
     } catch (error) {
       res.status(500).json({ message: error.message});
     }
   
   }

   module.exports = {addBatch};