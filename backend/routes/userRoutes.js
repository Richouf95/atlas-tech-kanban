const express = require('express');

const {
    getAllUsers,
    getSingleUser,
    signupUser,
    signinUser
} = require('../controllers/userControllers');

const router = express.Router();

// Get All Users
router.get('/all-users', getAllUsers);

// Get single User
router.get('/:id', getSingleUser);

// Signup 
router.post('/signup', signupUser);

// Signin
router.post('/signin', signinUser);

module.exports = router;