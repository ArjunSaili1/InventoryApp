const Ingredient = require('../models/ingredient')
const Meal = require('../models/meal')

module.exports.ingredient_list = async function(req, res, next){
    try{
        const allIngredients = await Ingredient.find({}).exec()
        res.render('ingredient_list', {ingredients: allIngredients});
    }catch(err){
        return next(err);
    }
}

module.exports.ingredient_detail = async function(req, res, next){
    try{
        const ingredient = await Ingredient.findById(req.params.id).exec();
        const ingredientMeals = await Meal.find({ingredients: {$all: [req.params.id]}})
        res.render('ingredient_detail', {ingredient: ingredient, meals: ingredientMeals})
    }catch(err){
        return next(err)
    }
}

module.exports.ingredient_create_get = function(req, res, next){
    res.send("Not Implemented Yet: Create Ingredient Get")
}

module.exports.ingredient_create_post = function(req, res, next){
    res.send("Not Implemented Yet: Create Ingredient Post")
}

module.exports.ingredient_update_get = function(req, res, next){
    res.send("Not Implemented Yet: Update Ingredient ID:" + JSON.stringify(req.params.id))
}

module.exports.ingredient_update_post = function(req, res, next){
    res.send("Not Implemented Yet: Update Ingredient ID:" + JSON.stringify(req.params.id))
}

module.exports.ingredient_delete_get = function(req, res, next){
    res.send("Not Implemented Yet: Get Delete Ingredient ID:" + JSON.stringify(req.params.id))
}

module.exports.ingredient_delete_post = function(req, res, next){
    res.send("Not Implemented Yet: Post Delete Ingredient ID:" + JSON.stringify(req.params.id))
}
