const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const ingredient_controller = require("../controllers/ingredientController");

router.get("/", ingredient_controller.ingredient_list);

router.get("/create", ingredient_controller.ingredient_create_get);

router.post(
  "/create",
  upload.single("ingredient_img"),
  ingredient_controller.ingredient_create_post
);

router.get("/:id/update", ingredient_controller.ingredient_update_get);

router.post("/:id/update", ingredient_controller.ingredient_update_post);

router.get("/:id/delete", ingredient_controller.ingredient_delete_get);

router.post("/:id/delete", ingredient_controller.ingredient_delete_post);

router.get("/:id", ingredient_controller.ingredient_detail);

module.exports = router;
