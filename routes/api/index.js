const router = require("express").Router();
const hackRoutes = require("./hacks");

// Book routes
router.use("/hacks", hackRoutes);

module.exports = router;
