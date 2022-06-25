#! /usr/bin/env node
console.log('This script populates some test cuisines, ingredients, and meals to the database.');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
require('dotenv').config()
const Cuisine = require('./models/cuisine')
const Ingredient = require('./models/ingredient')
const Meal = require('./models/meal')
const cloudinary = require('./utils/cloudinary')
const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let cuisines = []
let ingredients = []
let meals = []

async function uploadToCloudinary(itemType, item){
  const fileName = item.name.replace(/\s/g, '_').toLowerCase()
  const filePath = `./public/images/${fileName}.jpg`
  try{
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      public_id: `${itemType}/${item._id}`,
      overwrite: true
    })
    return uploadResult
  }catch(err){
    handleErr(err)
    return
  }
}

async function cuisineCreate(name, description, cb) {
  try{
    let cuisineDetail = {name:name}
    if (description != false) cuisineDetail.description = description
    let cuisine = new Cuisine(cuisineDetail);
    const upload = await uploadToCloudinary('cuisine', cuisine);
    cuisine.image = upload.url
    await cuisine.save();
    console.log('New Cuisine: ' + cuisine);
    cuisines.push(cuisine)
  }catch(err){
    handleErr(err)
    return;
  }
}

async function ingredientCreate(name, in_stock) {
  try{
    var ingredient = new Ingredient({ name: name, in_stock: in_stock });
    const upload = await uploadToCloudinary('ingredient', ingredient);
    ingredient.image = upload.url
    await ingredient.save()
    console.log('New Ingredient: ' + ingredient);
    ingredients.push(ingredient)
  }catch(err){
    handleErr(err)
    return;
  }
}

async function mealCreate(name, description, cuisine, ingredients, price) {
  try{
    var meal = new Meal({name: name, cuisine: cuisine, price: price, ingredients: ingredients});
    if (description != false) meal.description = description;
    const upload = await uploadToCloudinary('meal', meal)
    meal.image = upload.url
    await meal.save()
    console.log('New Meal: ' + meal);
    meals.push(meal)
  }catch(err){
    handleErr(err)
    return;
  }
}

async function clearCollections(){
  try{
    await Ingredient.collection.drop();
    await Cuisine.collection.drop();
    await Meal.collection.drop();
    await cloudinary.api.delete_all_resources()
  }catch(err){
    handleErr(err)
    return;
  }
}

async function createIngredientsCuisines(cb) {
  try{
    await clearCollections();
    await ingredientCreate('Tomatoes', true);
    await ingredientCreate('Onions', true);
    await ingredientCreate('Garlic', true);
    await ingredientCreate('Oil', true);
    await ingredientCreate('Feta', false);
    await ingredientCreate('Thyme', true);
    await ingredientCreate('Pasta', true);
    await ingredientCreate('Basil', true);
    await ingredientCreate('Chicken', true);
    await ingredientCreate('Broccoli', true);
    await ingredientCreate('Mushroom', true);
    await ingredientCreate('Ginger', true);
    await ingredientCreate('Soy Sauce', true);
    await ingredientCreate('Flour', true);
    await ingredientCreate('Broth', true);
    await ingredientCreate('Butter', true);
    await ingredientCreate('Oregano', true);
    await ingredientCreate('Parsley', true);
    await ingredientCreate('Parmesan', true);
    await ingredientCreate('Milk', true);
    await ingredientCreate('Salt', true);
    await ingredientCreate('Green Beans', true);
    await ingredientCreate('Pesto', true);
    await ingredientCreate('Mozzarella', true);
    await cuisineCreate('chinese', 'Tangy, Salty, Spicy, or Sweet! Chinese cuisine has dishes for everyone!');
    await cuisineCreate('italian', 'From Pizza to Pasta to Pesto. Italian cuisine has a lot to offer!');
    await cuisineCreate('greek', 'Greek cuisine: Healthy, Tasty and Interesting!');
    await cuisineCreate('american', 'There is more than just burgers and hotdogs!');
  }catch(err){
    handleErr();
    return;
  }
}

async function createMeals() {
  try{
    await mealCreate("Baked Feta Pasta", "A quick but elegant meal that packs loads of flavour. Made with Feta imported from Greece, Tomatoes from Italy and Home-grown Organic Onions.", cuisines[2], [ingredients[0], ingredients[1], ingredients[2], ingredients[3], ingredients[4], ingredients[5], ingredients[6], ingredients[7], ingredients[20]], 15.99)
    await mealCreate("Chicken & Veggie Stir-Fry", "Satisfy your cravings for chinese cuisine with this healthy meal of protein and veggies. But just because its good for you, doesn't mean it isn't delicious!", cuisines[0], [ingredients[8], ingredients[9], ingredients[10], ingredients[11], ingredients[12], ingredients[13], ingredients[14], ingredients[20], ingredients[3]], 12.99)
    await mealCreate("Chicken Alfredo Penne", "A steaming bowl of creamy pasta will surely hit the spot! Our rich alfredo sauce will coat your mouth with happiness!", cuisines[1], [ingredients[6], ingredients[7], ingredients[8], ingredients[20], ingredients[2], ingredients[3], ingredients[19], ingredients[18], ingredients[17], ingredients[16], ingredients[15], ingredients[13]], 19.99)
    await mealCreate("Pesto Chicken & Veggies", "Chicken and Pesto, a match made in heaven. This meal is healthy and perfect for anyone trying to eat better without giving up flavour!", cuisines[1], [ingredients[0], ingredients[3], ingredients[20], ingredients[8], ingredients[21], ingredients[22]], 21.99)
    await mealCreate("Pesto Chicken Bake", "Herby chicken covered in mozzerella cheese... Who knew something so simple could be so good!", cuisines[3], [ingredients[0], ingredients[13], ingredients[14], ingredients[0], ingredients[20]], 15.99)
  }catch(err){
    handleErr(err)
    return
  }
}

async function populate(){
  try{
    await createIngredientsCuisines()
    await createMeals()
    mongoose.connection.close();
  }catch(err){
    handleErr(err)
  }
}

function handleErr(err){
  if(err){
    console.log(err)
  }
  mongoose.connection.close();
}

populate();
