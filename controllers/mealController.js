const Ingredient = require('../models/ingredient')
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
        let meal_avaliable = true;
        const meal = await Meal.
                            findById(req.params.id).
                            populate('ingredients', ['name', 'in_stock']).
                            exec();
        console.log(meal.ingredients)
        meal.ingredients.forEach((ingredient)=>{
            if(!ingredient['in_stock']){
                meal_avaliable = false;
            }
        })
        res.render('meal_detail', {meal: meal, meal_avaliable: meal_avaliable})
    }catch(err){
        return next(err)
    }
}

module.exports.meal_create_get = function(req, res, next){
    res.send("Not Implemented Yet: Create Meal Get")
}

module.exports.meal_create_post = function(req, res, next){
    res.send("Not Implemented Yet: Create Meal Post")
}

module.exports.meal_update_get = function(req, res, next){
    res.send("Not Implemented Yet: Update Meal ID:" + JSON.stringify(req.params.id))
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
