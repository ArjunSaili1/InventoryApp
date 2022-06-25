const Ingredient = require('../models/ingredient')
const Meal = require('../models/meal')
const cloudinary = require('../utils/cloudinary');
const { body,validationResult } = require('express-validator');

module.exports.ingredient_list = async function(req, res, next){
    try{
        const allIngredients = await Ingredient.find({}).exec()
        res.render("grid", {items: allIngredients, itemType: "Ingredient"})
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
    res.render('ingredient_form', {title: "Create Ingredient"})
}

module.exports.ingredient_create_post = [
    body("ingredient_name", "Ingredient Name required").trim().isLength({min: 1}).escape(),
    body("ingredient_in_stock", "Ingredient must be in or out of stock").trim().isIn(["on", "off"]).escape(),
    async function(req, res, next){
        const validation = validationResult(req);
        if(!validation.isEmpty()){
            res.render("ingredient_form", {title: "Create Ingredient", errors: validation["errors"]});
            return;
        }
        try{
            let newIngredient = new Ingredient({
                name: req.body.ingredient_name, 
                in_stock: req.body.ingredient_in_stock === "on" ? true : false
            })
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "image",
                    public_id: `ingredient/${newIngredient._id}`,
                })
                newIngredient.image = result.url
            }
            await newIngredient.save()
            res.redirect(`/ingredient/${newIngredient._id}`)
        }catch(err){
            return next(err)
        }
    }
]

module.exports.ingredient_update_get = async function(req, res, next){
    try{
        const ingredient = await Ingredient.findById(req.params.id)
        res.render('ingredient_form', {title: "Update Ingredient", ingredient: ingredient})
    }catch(err){
        return next(err)
    }
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
