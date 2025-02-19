let included_ingredients = new Map();

const setIncludedIngredients = (ingredients) => {
    included_ingredients = ingredients;
    console.log("Setting included ingredients:", Array.from(included_ingredients.entries()));
};

const getIncludedIngredients = () => {
    return included_ingredients;
}

module.exports = { setIncludedIngredients, getIncludedIngredients };