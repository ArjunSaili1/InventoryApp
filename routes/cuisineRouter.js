var express = require('express');
var router = express.Router();
var Cuisine = require('../models/cuisine')

router.get('/', function(req, res, next){
    res.send("Not Implemented Yet")
})

router.get('/create', function(req, res, next){
    res.send("Not Implemented Yet: Create Cuisine")
})

router.get('/:id/update', function(req, res, next){
    res.send("Not Implemented Yet: Update Cuisine ID:" + JSON.stringify(req.params.id))
})

router.get('/:id/delete', function(req, res, next){
    res.send("Not Implemented Yet: Delete Cuisine ID:" + JSON.stringify(req.params.id))
})

router.get('/:id', function(req, res, next){
    Cuisine.findById(req.params.id).exec(function(err, thisCuisine){
        if(err){return next(err)}
        console.log(thisCuisine)
        res.render("test", {cuisine: thisCuisine})
    })
})

module.exports = router;