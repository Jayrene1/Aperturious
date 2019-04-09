const router = require("express").Router();
const photographersController = require("../../controllers/photographersController");

//Matches with "/api/photographers"
router.route("/")
    .get(photographersController.findAll)
    .post(photographersController.create);

//Matches with "/api/photographers/:id"
router
    .route("/:id")
    .get(photographersController.findById)
    .put(photographersController.update)
    .delete(photographersController.remove);

module.exports = router;
