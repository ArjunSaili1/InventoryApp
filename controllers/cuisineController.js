const Cuisine = require('../models/cuisine')
const Meal = require('../models/meal')
const { body,validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');


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
    res.render('cuisine_form', {title: "Create Cuisine"})
}

module.exports.cuisine_create_post = [
    body("cuisine_name", "Cuisine Name is Required.").trim().isLength({min: 1}).escape(),
    body("cuisine_description", "Cuisine description is required.").isLength({min: 1}).escape(),
    async function(req, res, next){
        const validation = validationResult(req);
        if(!validation.isEmpty()){
            res.render("cuisine_form", {title: "Create Cuisine", errors: validation["errors"]})
            return;
        }
        try{
            let newCuisine = new Cuisine({
                name: req.body.cuisine_name,
                description: req.body.cuisine_description
            })
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path,{
                    resource_type: "image",
                    public_id: `cuisine/${newCuisine._id}`
                })
                newCuisine.image = result.url
            }
            await newCuisine.save()
            res.redirect(`/cuisine/${newCuisine._id}`)
        }catch(err){
            return next(err)
        }
}]

module.exports.cuisine_update_get = async function(req, res, next){
    try{
        const cuisine = await Cuisine.findById(req.params.id);
        res.render('cuisine_form', {title: "Update Cuisine", cuisine: cuisine})
    }catch(err){
        return next(err)
    }
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
