const express = require("express");
const addressControllers = require("../controllers/addressControllers");
const router = express.Router();

router
  .route("/")
  .get(addressControllers.getAllAddresses)
  .post(addressControllers.createAddress);

router
  .route("/:id")
  .get(addressControllers.getAddressById)
  .patch(addressControllers.updateAddressById)
  .delete(addressControllers.deleteAddressById);

module.exports = router;