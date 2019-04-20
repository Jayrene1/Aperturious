const router = require("express").Router();
const usersRoutes = require("./users");
const collectionsRoutes = require("./collections");
const photosRoutes = require("./photos");

router.use("/users", usersRoutes);
router.use("/collections", collectionsRoutes);
router.use("/photos", photosRoutes);

module.exports = router;
