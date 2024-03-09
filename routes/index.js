var express = require('express');
var router = express.Router();


const part_controller = require("../controllers/partController");

/* GET home page. */
router.get("/", part_controller.index);

router.get("/part/create", part_controller.part_create_get);

router.post("/part/create", part_controller.part_create_post);




router.get("/parts", part_controller.part_list);





module.exports = router;
