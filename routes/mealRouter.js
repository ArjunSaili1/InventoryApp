var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.send("Not Implemented Yet")
})

router.get('/create', function(req, res, next){
    res.send("Not Implemented Yet: Create Meal")
})

router.get('/:id/update', function(req, res, next){
    res.send("Not Implemented Yet: Update meal ID:" + JSON.stringify(req.params.id))
})

router.get('/:id/delete', function(req, res, next){
    res.send("Not Implemented Yet: Delete meal ID:" + JSON.stringify(req.params.id))
})

router.get('/:id', function(req, res, next){
    res.send("Not Implemented Yet: meal ID:" + JSON.stringify(req.params.id))
})


module.exports = router;