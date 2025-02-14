const User = require('../models/userModel');

/**
 * Add ingredient endpoint
 */
//! //* if the user is not found it returns "message": "Cast to ObjectId failed for value \"67af9c95652b7c25f1cb7e8eeee\" (type string) at path \"_id\" for model \"users\""
const addIngredient = async (req, res) => {
    let { _id, name, category, quantity } = req.body;

    try {
        const user = await User.findById(_id); //TODO 
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if ingredient already exists in kitchen stock
        if (user.kitchenStock.has(name)) {
            var existingIngredient = user.kitchenStock.get(name);

            // Update quantity
            existingIngredient.quantity += quantity;
            // TODO: update expirationDate logic with stock 
        } else {
            user.kitchenStock.set(name, {
                category,
                quantity: quantity
            });
        }
        await user.save();
        res.status(200).json({ message: "Ingredient added successfully", ingredient: existingIngredient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Delete ingredient endpoint
 */
const deleteIngredient = async (req, res) => {
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
const getIngredient = async (req, res) => {
    let { _id, name } = req.body;

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
    let { _id } = req.body;

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

module.exports = { addIngredient, deleteIngredient, getIngredient, getAllIngredients };
