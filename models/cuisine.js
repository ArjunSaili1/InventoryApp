var mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    description: {type: String, required: true, minlength: 1}
})

cuisineSchema
.virtual('url')
.get(function(){
    return 'cuisine/' + this._id
})

module.exports = mongoose.model("Cuisine", cuisineSchema)