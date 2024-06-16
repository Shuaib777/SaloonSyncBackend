const express = require("express");

const saloonsController = require("../controller/saloonsController.js");

const router = express.Router();

router
  .get("/", saloonsController.readSaloons)
  .get("/:saloonId", saloonsController.readSaloon)
  .get("/search", saloonsController.searchSaloons)
  .get("/search/multiple", saloonsController.searchMultiple)
  .get("/menu/:saloonId", saloonsController.menu)
  .post("/", saloonsController.createSaloon)
  .post("/createMany", saloonsController.createAll)
  .put("/:saloonId", saloonsController.updateSaloon)
  .delete("/:saloonId", saloonsController.deleteSaloon);

exports.saloonsRouter = router;
