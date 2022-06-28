const Ingredient = require("../models/ingredient");
const Cuisine = require("../models/cuisine");
const Meal = require("../models/meal");
const cloudinary = require("../utils/cloudinary");
const { body, validationResult } = require("express-validator");

module.exports.meal_list = async function (req, res, next) {
  try {
    const allMeals = await Meal.find({}).exec();
    res.render("grid", { items: allMeals, itemType: "Meal" });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_detail = async function (req, res, next) {
  try {
    const meal = await Meal.findById(req.params.id)
      .populate("ingredients", ["name", "in_stock"])
      .populate("cuisine")
      .exec();
    meal.available = true;
    meal.ingredients.forEach((ingredient) => {
      if (!ingredient["in_stock"]) {
        meal.available = false;
      }
    });
    res.render("meal_detail", { meal: meal });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_create_get = async function (req, res, next) {
  try {
    const ingredients = await Ingredient.find({});
    const cuisines = await Cuisine.find({});
    res.render("meal_form", {
      title: "Create Meal",
      ingredients: ingredients,
      cuisines: cuisines,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_create_post = [
  body("meal_name", "Meal Name is Required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("meal_description").trim().escape(),
  body("cuisine", "Cuisine must be selected").isLength({ min: 1 }).escape(),
  body("ingredients", "Ingredients must be selected")
    .isLength({ min: 1 })
    .escape(),
  body("meal_price", "Price is required")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),
  async function (req, res, next) {
    console.log("ran");
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      console.log(validation);
      const ingredients = await Ingredient.find({});
      const cuisines = await Cuisine.find({});
      res.render("meal_form", {
        title: "Create Meal",
        ingredients: ingredients,
        cuisines: cuisines,
        errors: validation["errors"],
      });
      return;
    }
    try {
      let selectedCuisine = await Cuisine.findOne({ name: req.body.cuisine });
      let ingreidentsInDB = await Ingredient.find(
        {
          name: { $in: req.body.ingredients },
        },
        "_id"
      );
      let newMeal = new Meal({
        name: req.body.meal_name,
        cuisine: selectedCuisine._id,
        ingredients: [...ingreidentsInDB],
        price: req.body.meal_price,
      });
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
          public_id: `meal/${newMeal._id}`,
        });
        newMeal.image = result.url;
      }
      await newMeal.save();
      res.redirect(newMeal.url);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports.meal_update_get = async function (req, res, next) {
  try {
    const meal = await Meal.findById(req.params.id);
    res.render("meal_form", { title: "Update Meal", meal: meal });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_update_post = function (req, res, next) {
  res.send(
    "Not Implemented Yet: Update Meal ID:" + JSON.stringify(req.params.id)
  );
};

module.exports.meal_delete_get = function (req, res, next) {
  res.send(
    "Not Implemented Yet: Get Delete Meal ID:" + JSON.stringify(req.params.id)
  );
};

module.exports.meal_delete_post = function (req, res, next) {
  res.send(
    "Not Implemented Yet: Post Delete Meal ID:" + JSON.stringify(req.params.id)
  );
};
