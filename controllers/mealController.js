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
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
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
    const meal = await Meal.findById(req.params.id)
      .populate("ingredients", ["name", "in_stock"])
      .populate("cuisine");
    const cuisines = await Cuisine.find({});
    const ingredients = await Ingredient.find({});
    let checkedIngredients = [];
    meal.ingredients.forEach((ingr) => {
      checkedIngredients.push(ingr.name);
    });
    res.render("meal_form", {
      title: "Update Meal",
      meal,
      cuisines,
      checkedIngredients,
      ingredients,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_update_post = [
  async function (req, res, next) {
    console.log("tewtet", req.param["ingredients"]);
    const meal = await Meal.findById(req.params.id)
      .populate("ingredients", ["name", "in_stock"])
      .populate("cuisine");
    const cuisines = await Cuisine.find({});
    const ingredients = await Ingredient.find({});
    console.log(req.body.ingredients);
    let ingreidentsInDB = await Ingredient.find(
      {
        name: { $in: req.body.ingredients },
      },
      "_id"
    );
    let checkedIngredients = [];
    meal.ingredients.forEach((ingr) => {
      checkedIngredients.push(ingr.name);
    });
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      res.render("meal_form", {
        title: "Update Meal",
        cuisines,
        ingredients,
        checkedIngredients,
        errors: validation["errors"],
      });
      return;
    }
    try {
      if (meal.name !== req.body.meal_name) {
        meal.name = req.body.meal_name;
      }
      if (meal.description !== req.body.meal_description) {
        meal.description = req.body.meal_description;
      }
      if (meal.price !== req.body.meal_price) {
        meal.price = req.body.meal_price;
      }
      if (meal.cuisine.name !== req.body.cuisine) {
        const newCuisine = await Cuisine.find({ name: req.body.cuisine });
        meal.cuisine = newCuisine[0]._id;
      }
      meal.ingredients = [];
      for (let i = 0; i < ingreidentsInDB.length; i++) {
        meal.ingredients.push(ingreidentsInDB[i]);
      }
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
          public_id: `meal/${meal._id}`,
        });
        meal.image = result.url;
      }
      await meal.save();
      res.redirect(meal.url);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports.meal_delete_get = async function (req, res, next) {
  try {
    const meal = await Meal.findById(req.params.id);
    res.render("delete_meal", { meal, deleteLink: req.originalUrl });
  } catch (err) {
    return next(err);
  }
};

module.exports.meal_delete_post = async function (req, res, next) {
  try {
    await Meal.deleteOne({ _id: req.params.id });
    res.redirect("/meal");
  } catch (err) {
    return next(err);
  }
};
