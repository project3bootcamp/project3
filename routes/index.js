const path = require("path");
const router = require("express").Router();
const actorRoutes = require("./api/actorsearch");
const movieRoutes = require("./api/moviesearch");
const userRoutes = require("./user/user");

// API Routes
router.use("/api", actorRoutes);
router.use("/movie", movieRoutes);
// router.use('/users', require('./user/userRoutes'));


// User Routes
router.use("/user",userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;