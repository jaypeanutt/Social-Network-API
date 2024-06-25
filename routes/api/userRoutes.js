const router = require('express').Router();

// All Required API Routes for Users
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Retrieve (GET) all users and POST | /api/users 
router.route('/').get(getUsers).post(createUser);

// Retreive (GET) a single user. PUT and DELETE a user via their id | /api/users/:userId
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

//  POST and DELETE a friend by their ID | /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;