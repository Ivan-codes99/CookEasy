let included_ingredients = new Map();

const setIncludedIngredients = (ingredients) => {
    included_ingredients = ingredients;
};

const getIncludedIngredients = () => {
    return included_ingredients;
}


module.exports = {setIncludedIngredients, getIncludedIngredients};