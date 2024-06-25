const router = require("express").Router();

const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteOneThought,
  createReaction,
  deleteOneReaction,
} = require("../../controllers/thoughtController");

// Retreive (GET) all thoughts and POST | /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Retrieve (GET), Update (PUT) and DELETE a single thought | /api/thoughts/:thoughtId GET one thought, PUT and DELETE by iD
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteOneThought);

//  Create (POST) new Reactions | /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// DELETE a single Reaction by ID | /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteOneReaction);

module.exports = router;