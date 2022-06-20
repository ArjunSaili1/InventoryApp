const Ingredient = require('../models/ingredient')
const Cuisine = require('../models/cuisine')
const Meal = require('../models/meal')

module.exports.meal_list = async function(req, res, next){
    try{
        const allMeals = await Meal.find({}).exec();
        res.render("grid", {items: allMeals, itemType: "Meal"})
    }catch(err){
        return next(err)
    }
}

module.exports.meal_detail = async function(req, res, next){
    try{
        const meal = await Meal.
                            findById(req.params.id).
                            populate('ingredients', ['name', 'in_stock']).
                            populate('cuisine').
                            exec();
        meal.available = true;
        meal.ingredients.forEach((ingredient)=>{
            if(!ingredient['in_stock']){
                meal.available = false;
            }
        })
        res.render('meal_detail', {meal: meal})
    }catch(err){
        return next(err)
    }
}

module.exports.meal_create_get = async function(req, res, next){
    try{
        const ingredients = await Ingredient.find({});
        const cuisines = await Cuisine.find({});
        res.render('meal_form', {title: "Create Meal", ingredients: ingredients, cuisines: cuisines});
    }catch(err){
        return next(err)
    }
}

module.exports.meal_create_post = function(req, res, next){
    res.send("Not Implemented Yet: Create Meal Post")
}

module.exports.meal_update_get = async function(req, res, next){
    try{
        const meal = await Meal.findById(req.params.id)
        res.render('meal_form', {title: "Update Meal", meal: meal})
    }catch(err){
        return next(err)
    }
}

module.exports.meal_update_post = function(req, res, next){
    res.send("Not Implemented Yet: Update Meal ID:" + JSON.stringify(req.params.id))
}

module.exports.meal_delete_get = function(req, res, next){
    res.send("Not Implemented Yet: Get Delete Meal ID:" + JSON.stringify(req.params.id))
}

module.exports.meal_delete_post = function(req, res, next){
    res.send("Not Implemented Yet: Post Delete Meal ID:" + JSON.stringify(req.params.id))
}
