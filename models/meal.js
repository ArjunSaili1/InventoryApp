var mongoose = require('mongoose')
var Ingredient = require('./ingredient')

const mealSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    description: {type: String},
    cuisine: {type: mongoose.SchemaTypes.ObjectId, ref: "Cuisine" ,required: true},
    ingredients: {type: [mongoose.SchemaTypes.ObjectId], ref:"Ingredient", required: true},
    price: {type: Number, required: true},
    image: {type: String}
})

mealSchema
.virtual('url')
.get(function(){
    return '/meal/' + this._id
})

/* mealSchema
  .virtual('in_stock')
  .get(function(){
      Ingredient.find({_id: {$in: this.ingredients}}).exec(function(err, results){
          if(err){throw new Error('Error getting ingreidents')}
          for(let i=0; i < results.length; i++){
              console.log(results[i]["in_stock"])
              if(results[i]["in_stock"] === false){
                  return false
              }
          }
          return true
      })
  }) */
  
module.exports = mongoose.model("Meal", mealSchema); 