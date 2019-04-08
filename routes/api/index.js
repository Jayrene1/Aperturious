const router = require("express").Router();
const collectionsRoutes = require("./collections");
const photosRoutes = require("./photos");
const photographersRoutes = require("./photographers");
const usersRoutes = require("./users");

router.use("/collections", collectionsRoutes);
router.use("/photos", photosRoutes);
router.use("/photographers", photographersRoutes);
router.use("/users", usersRoutes);


module.exports = router;
