const { User, Thought } = require("../models");

module.exports = {
  //Retrieve (GET) all users
  getUsers(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //Retrieve (GET) a single user
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `I'm unable to find a User with that ID` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create (POST) a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Update (PUT) an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `I'm unable to find a User with that ID` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE a single user (Remove a user's associated thoughts when deleted)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `I'm unable to find a User with that ID` })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: `User and associated thought has been DELETED` })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a User by adding (PUT) a new Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `I'm unable to find a User with that ID` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE an existing Friend from a User
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: `I'm unable to find a User with that ID` })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};