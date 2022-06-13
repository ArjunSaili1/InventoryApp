var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.send("Not Implemented Yet")
})

router.get('/create', function(req, res, next){
    res.send("Not Implemented Yet: Create Ingredient")
})

router.get('/:id/update', function(req, res, next){
    res.send("Not Implemented Yet: Update ingredient ID:" + JSON.stringify(req.params.id))
})

router.get('/:id/delete', function(req, res, next){
    res.send("Not Implemented Yet: Delete ingredient ID:" + JSON.stringify(req.params.id))
})

router.get('/:id', function(req, res, next){
    res.send("Not Implemented Yet: ingredient ID:" + JSON.stringify(req.params.id))
})

module.exports = router;