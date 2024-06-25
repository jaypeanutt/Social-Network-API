const { User, Thought } = require("../models");

module.exports = {
  // Retreive (GET) all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Retreive (GET) a single thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `I'm unable to find a Thought with that ID` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create (POST) a Thought tying it's id to the associated User's array
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: `New Thought has been added` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update (PUT) an existing Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: `I'm unable to find a Thought with that ID` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE a single Thought
  deleteOneThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `I'm unable to find a Thought with that ID` })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `Thought (without User) has been DELETED` })
          : res.json({ message: `Thought has been DELETED` })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create (POST) a new Reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `I'm unable to find a Thought with that ID` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE an existing reaction
  deleteOneReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `I'm unable to find a Thought with that ID` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};