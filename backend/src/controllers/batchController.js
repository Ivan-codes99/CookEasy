const User = require('../models/userModel');


/*
  TODO //?changeCategoryName
  ! Use .get() when accessing properties in a Map instead of bracket notation.

  TODO deleteBatch (low priority for now)
  TODO other batch methods (low priority for now)
  TODO Add expirationDate to a batch, 
  TODO Implement batch merging logic
  */
 

  //* Not gonna check if category or ingredient exists at least for now, since irl that shouldn't happen
  const addBatch = async (req, res) => { //We just need _id, category, ingredient, and a batch map
     let {_id, category, ingredient, batch} = req.body;
   
     try {
       const user = await User.findById(_id);
       if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
     
       user.kitchenStock.get(category).ingredients.get(ingredient).batches.push(batch);
       await user.save();
       res.status(200).json({ message: `New ${ingredient} batch added to kitchen stock successfully supposedly lol`});
   
     } catch (error) {
       res.status(500).json({ message: error.message});
     }
   
   }

   //* Not gonna check if category or ingredient exists at least for now, since irl that shouldn't happen
  //! We're just gonna pop for now
  const deleteBatch = async (req, res) => { //We just need _id, category, ingredient
    let {_id, category, ingredient} = req.body;
  
    try {
      const user = await User.findById(_id);
      if (!user) return res.status(404).json({message: "User not found"}); //checking user exists
    
      user.kitchenStock.get(category).ingredients.get(ingredient).batches.pop();
      await user.save();
      res.status(200).json({ message: `${ingredient} batch deleted from kitchen stock successfully supposedly lol`});
  
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  
  }
  
   module.exports = {addBatch, deleteBatch};
   