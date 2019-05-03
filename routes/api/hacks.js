const router = require("express").Router();
const hacksController = require("../../controllers/hacksController");

// Matches with "/api/books"
router.route("/")
  .get(hacksController.findAll)
  .post(hacksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(hacksController.findById)
  .put(hacksController.update)
  .delete(hacksController.remove);

module.exports = router;
