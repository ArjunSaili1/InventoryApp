const Cuisine = require('../models/cuisine')
const Meal = require('../models/meal')

module.exports.cuisine_list = function(req, res, next){
    res.send("Not Implemented Yet Cuisine List")
}

module.exports.cuisine_detail = function(req, res, next){
    Cuisine.findById(req.params.id).exec(function(err, thisCuisine){
        if(err){return next(err)}
        console.log(thisCuisine)
        res.render("test", {cuisine: thisCuisine})
    })
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
