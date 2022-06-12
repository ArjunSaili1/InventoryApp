var mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    description: {type: String},
    cuisine: {type: mongoose.SchemaTypes.ObjectId, ref: "Cuisine" ,required: true},
    ingredients: {type: [mongoose.SchemaTypes.ObjectId], ref:"Ingredient", required: true},
    price: {type: Number, required: true}
})

mealSchema
.virtual('url')
.get(function(){
    return 'meal/' + this._id
})

/* mealSchema
  .virtual('in_stock')
  .get(function(){
      //To be implemented
  }) */
  
module.export = mongoose.model('Meal', mealSchema); 