const router = require("express").Router();
const photographersRoutes = require("./photographers");
const usersRoutes = require("./users");
const collectionsRoutes = require("./collections");
const photosRoutes = require("./photos");

router.use("/photographers", photographersRoutes);
router.use("/users", usersRoutes);
router.use("/collections", collectionsRoutes);
router.use("/photos", photosRoutes);

module.exports = router;
