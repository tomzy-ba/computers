var express = require('express');
var router = express.Router();


const part_controller = require("../controllers/partController");

/* GET home page. */
router.get("/", part_controller.index);

router.get("/part/create", part_controller.part_create_get);

router.post("/part/create", part_controller.part_create_post);

router.get("/part/:id", part_controller.part_detail);

router.get("/part/:id/delete", );

router.get("/parts", part_controller.part_list);

router.get("/brands", part_controller.brand_list);

router.get("/brand/create", part_controller.brand_create_get);

router.post("/brand/create", part_controller.brand_create_post);

router.get("/brand/:id", part_controller.brand_detail);





module.exports = router;
