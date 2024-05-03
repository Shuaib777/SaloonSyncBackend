const express = require("express");

const saloonsController = require("../controller/saloonsController.js");

const router = express.Router();

router
  .get("/", saloonsController.readSaloons)
  .get("/search", saloonsController.searchSaloons)
  .get("/search/multiple", saloonsController.searchMultiple)
  .get("/searchMenu/:saloonId", saloonsController.searchMenu)
  .get("/:saloonId", saloonsController.readSaloon)
  .post("/", saloonsController.createSaloon)
  .put("/:saloonId", saloonsController.updateSaloon)
  .delete("/:saloonId", saloonsController.deleteSaloon);

exports.saloonsRouter = router;
