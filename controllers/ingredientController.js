const Ingredient = require('../models/ingredient')

module.exports.ingredient_list = function(req, res, next){
    res.send("Not Implemented Yet Ingredient List")
}

module.exports.ingredient_detail = function(req, res, next){
    res.send("Not Implemented Yet Ingredient Detail")
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
