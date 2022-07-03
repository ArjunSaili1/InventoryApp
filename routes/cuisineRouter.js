const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const cuisine_controller = require('../controllers/cuisineController')

router.get('/', cuisine_controller.cuisine_list)

router.get('/create', cuisine_controller.cuisine_create_get)

router.post('/create', upload.single("cuisine_img"), cuisine_controller.cuisine_create_post)

router.get('/:id/update', cuisine_controller.cuisine_update_get)

router.post('/:id/update', cuisine_controller.cuisine_update_post)

router.get('/:id/delete', cuisine_controller.cuisine_delete_get)

router.post('/:id/delete', cuisine_controller.cuisine_delete_post)

router.get('/:id', cuisine_controller.cuisine_detail)

module.exports = router;