const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const meal_controller = require("../controllers/mealController");

router.get("/", meal_controller.meal_list);

router.get("/create", meal_controller.meal_create_get);

router.post(
  "/create",
  upload.single("meal_img"),
  meal_controller.meal_create_post
);

router.get("/:id/update", meal_controller.meal_update_get);

router.post(
  "/:id/update",
  upload.single("meal_img"),
  meal_controller.meal_update_post
);

router.get("/:id/delete", meal_controller.meal_delete_get);

router.post("/:id/delete", meal_controller.meal_delete_post);

router.get("/:id", meal_controller.meal_detail);

module.exports = router;
