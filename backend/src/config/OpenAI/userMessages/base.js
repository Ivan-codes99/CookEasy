const {getIncludedIngredients} = require('../../../controllers/OpenAI/includedIngredientsController.js');
//!hardcoding these 2 variables here for now lol
const meal_focus = "Protein-heavy";
const servings = "2";

const userMessage = () => {
    const ingredients = getIncludedIngredients();
    console.log("Getting user message");

    let message = "Here are the ingredients I have:";
    for (const[ingredientName, ingredientData] of ingredients.entries()) {
        let stringified = stringifyIngredient(ingredientName.toString(), ingredientData);
        message += "\n"+ "- " + stringified;
    }
    message += "\n\nMeal Focus: " + meal_focus + "\n" + "Servings: " + servings;
    return message;
}

const stringifyIngredient = (name, data) => {
    if (data.batches.length < 1) {
        return name;
    }
    else {
        quantity = data.batches[0].quantity.toString();
        unit = data.batches[0].unit;
        if (unit === "count") {
            return(quantity + " " + name);
        }
        else {
            return(quantity + " " + unit + " of " + name);
        }
    }
}

module.exports = {userMessage};