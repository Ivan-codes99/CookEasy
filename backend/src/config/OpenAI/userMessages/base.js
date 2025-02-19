const {getIncludedIngredients} = require('../../../controllers/OpenAI/includedIngredientsController.js');

const userMessage = () => {
    ingredients = getIncludedIngredients();

    const message = "Here are the ingredients I have:";
    for (const[ingredientName, ingredientData] of ingredients.entries()) {
        stringified = stringifyIngredient(ingredientName.toString(), ingredientData);
        message += "\n"+ "- " + stringified;
    }
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
message = userMessage();
module.exports = {message};