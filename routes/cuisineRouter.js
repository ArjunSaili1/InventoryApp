var express = require('express');
var router = express.Router();

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
    res.send("Not Implemented Yet: Cuisine ID:" + JSON.stringify(req.params.id))
})

module.exports = router;