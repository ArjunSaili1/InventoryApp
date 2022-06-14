const Ingredient = require('../models/ingredient')
const Meal = require('../models/meal')

module.exports.meal_list = function(req, res, next){
    res.send("Not Implemented Yet Meal List")
}

module.exports.meal_detail = function(req, res, next){
    res.send("Not Implemented Yet Meal Detail")
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
