const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRETE, { expiresIn: "3d" });
}


// Get All Users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('email name');

    return res.status(200).json(users);
}

// Get single User
const getSingleUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }

    const user = await User.findById({ _id: id }).select('email name');;

    if (!user) {
        return res.status(404).json({ error: "No such user" });
    }

    return res.status(200).json(user);
}

// Signup 
const signupUser = async (req, res) => {
    const { email, name, pwd } = req.body;

    try {
        const user = await User.signup(email, name, pwd);

        const token = createToken(user._id);

        return res.status(200).json({ userId: user._id, email: user.email, name: user.name, token })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Signin
const signinUser = async (req, res) => {
    const { email, pwd } = req.body;

    try {
        const user = await User.signin(email, pwd);

        const token = createToken(user._id);

        return res.status(200).json({ userId: user._id, email: user.email, name: user.name, token })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    signupUser,
    signinUser
}