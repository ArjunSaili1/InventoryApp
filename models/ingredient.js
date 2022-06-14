var mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    in_stock: {type: Boolean, required: true},
    image: {type: String}
})

ingredientSchema
.virtual('url')
.get(function(){
    return '/ingredient/' + this._id;
})

module.exports = mongoose.model("Ingredient", ingredientSchema);