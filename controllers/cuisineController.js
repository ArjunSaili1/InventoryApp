const Cuisine = require('../models/cuisine')
const Meal = require('../models/meal')
const async = require('async')
const { name } = require('ejs')

module.exports.cuisine_list = async function(req, res, next){
    try{
        const allCuisines = await Cuisine.find({}).exec();
        res.render("grid", {items: allCuisines, itemType: "Cuisine"})
    }catch(err){
        return next(err)
    }
}

module.exports.cuisine_detail = async function(req, res, next){
    try{
        const cuisine = await Cuisine.findById(req.params.id).exec();
        const cuisineMeals = await Meal.find({cuisine: cuisine._id}).exec()
        res.render('cuisine_detail', {cuisine: cuisine, cuisineMeals: cuisineMeals})
    }catch(err){
        return next(err)
    }
}

module.exports.cuisine_create_get = function(req, res, next){
    res.send("Not Implemented Yet: Create Cuisine Get")
}

module.exports.cuisine_create_post = function(req, res, next){
    res.send("Not Implemented Yet: Create Cuisine Post")
}

module.exports.cuisine_update_get = function(req, res, next){
    res.send("Not Implemented Yet: Update Cuisine ID:" + JSON.stringify(req.params.id))
}

module.exports.cuisine_update_post = function(req, res, next){
    res.send("Not Implemented Yet: Update Cuisine ID:" + JSON.stringify(req.params.id))
}

module.exports.cuisine_delete_get = function(req, res, next){
    res.send("Not Implemented Yet: Get Delete Cuisine ID:" + JSON.stringify(req.params.id))
}

module.exports.cuisine_delete_post = function(req, res, next){
    res.send("Not Implemented Yet: Post Delete Cuisine ID:" + JSON.stringify(req.params.id))
}
