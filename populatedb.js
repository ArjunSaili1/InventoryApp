#! /usr/bin/env node

console.log('This script populates some test cuisines, ingredients, and meals to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Cuisine = require('./models/cuisine')
var Ingredient = require('./models/ingredient')
var Meal = require('./models/meal')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cuisines = []
var ingredients = []
var meals = []

function cuisineCreate(name, description, cb) {
  cuisinedetail = {name:name}
  if (description != false) cuisinedetail.description = description
  
  var cuisine = new Cuisine(cuisinedetail);
       
  cuisine.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Cuisine: ' + cuisine);
    cuisines.push(cuisine)
    console.log(cuisines)
    cb(null, cuisine)
  }  );
}

function ingredientCreate(name, in_stock, cb) {
  var ingredient = new Ingredient({ name: name, in_stock: in_stock });
  ingredient.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Ingredient: ' + ingredient);
    ingredients.push(ingredient)
    cb(null, ingredient);
  }   );
}

function mealCreate(name, description, cuisine, ingredients, price, cb) {
  var meal = new Meal({name: name, cuisine: cuisine, price: price, ingredients: ingredients});   
  if (description != false) meal.description = description
  meal.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Meal: ' + meal);
    meals.push(meal)
    cb(null, meal)
  }  );
}


function createIngredientsCuisines(cb) {
    async.series([
        function(callback) {
          ingredientCreate('Tomatoes', true, callback);
        },
        function(callback) {
          ingredientCreate('Onions', true, callback);
        },
        function(callback) {
          ingredientCreate('Garlic', true, callback);
        },
        function(callback) {
          ingredientCreate('Oil', true, callback);
        },
        function(callback) {
          ingredientCreate('Feta', true, callback);
        },
        function(callback) {
          ingredientCreate('Thyme', true, callback);
        },
        function(callback) {
          ingredientCreate('Pasta', true, callback);
        },
        function(callback) {
          ingredientCreate('Basil', true, callback);
        },
        function(callback) {
          ingredientCreate('Chicken', true, callback);
        },
        function(callback) {
          ingredientCreate('Broccoli', true, callback);
        },
        function(callback) {
          ingredientCreate('Mushroom', true, callback);
        },
        function(callback) {
          ingredientCreate('Ginger', true, callback);
        },
        function(callback) {
          ingredientCreate('Soy Sauce', true, callback);
        },
        function(callback) {
          ingredientCreate('Flour', true, callback);
        },
        function(callback) {
          ingredientCreate('Broth', true, callback);
        },
        function(callback) {
          ingredientCreate('Butter', true, callback);
        },
        function(callback) {
          ingredientCreate('Oregano', true, callback);
        },
        function(callback) {
          ingredientCreate('Parsley', true, callback);
        },
        function(callback) {
          ingredientCreate('Parmesan', true, callback);
        },
        function(callback) {
          ingredientCreate('Milk', true, callback);
        },
        function(callback) {
          ingredientCreate('Salt', true, callback);
        },
        function(callback) {
          ingredientCreate('Green Beans', true, callback);
        },
        function(callback) {
          ingredientCreate('Pesto', true, callback);
        },
        function(callback) {
          ingredientCreate('Mozzarella', true, callback);
        },
        function(callback) {
          cuisineCreate('chinese', 'Tangy, Salty, Spicy, or Sweet! Chinese cuisine has dishes for everyone!', callback);
        },
        function(callback) {
          cuisineCreate('italian', 'From Pizza to Pasta to Pesto. Italian cuisine has a lot to offer!', callback);
        },
        function(callback) {
          cuisineCreate('greek', 'Greek cuisine: Healthy, Tasty and Interesting!', callback);
        },
        function(callback) {
          cuisineCreate('american', 'There is more than just burgers and hotdogs!', callback);
        },
        ],
        // optional callback
        cb);
}


function createMeals(cb) {
  console.log("From create meal:", cuisines[2])
    async.parallel([
        function(callback) {
          mealCreate("Baked Feta Pasta", "A quick but elegant meal that packs loads of flavour. Made with Feta imported from Greece, Tomatoes from Italy and Home-grown Organic Onions.", cuisines[2], [ingredients[0], ingredients[1], ingredients[2], ingredients[3], ingredients[4], ingredients[5], ingredients[6], ingredients[7], ingredients[20]], 15.99, callback)
        },
        function(callback) {
          mealCreate("Chicken & Veggie Stir-Fry", "Satisfy your cravings for chinese cuisine with this healthy meal of protein and veggies. But just because its good for you, doesn't mean it isn't delicious!", cuisines[0], [ingredients[8], ingredients[9], ingredients[10], ingredients[11], ingredients[12], ingredients[13], ingredients[14], ingredients[20], ingredients[4]], 12.99, callback)
        },
        function(callback) {
          mealCreate("Easy Chicken Alfredo Penne", "A steaming bowl of creamy pasta will surely hit the spot! Our rich alfredo sauce will coat your mouth with happiness!", cuisines[1], [ingredients[6], ingredients[7], ingredients[8], ingredients[20], ingredients[2], ingredients[3], ingredients[19], ingredients[18], ingredients[17], ingredients[16], ingredients[15], ingredients[13]], 19.99, callback)
        },
        function(callback) {
          mealCreate("Pesto Chicken & Veggies", "Chicken and Pesto, a match made in heaven. This meal is healthy and perfect for anyone trying to eat better without giving up flavour!", cuisines[1], [ingredients[0], ingredients[3], ingredients[20], ingredients[8], ingredients[21], ingredients[22]], 21.99, callback)
        },
        function(callback) {
          mealCreate("Pesto Chicken Bake", "Herby chicken covered in mozzerella cheese... Who knew something so simple could be so good!", cuisines[3], [ingredients[0], ingredients[13], ingredients[14], ingredients[0], ingredients[20]], 15.99, callback)
        },
        ],
        // optional callback
        cb);
}



async.series([
  createIngredientsCuisines,
  createMeals
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




