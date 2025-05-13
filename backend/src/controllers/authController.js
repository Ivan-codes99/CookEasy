const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/* 
 !if the user is not found it returns "message": 
 !"Cast to ObjectId failed for value \"67af9c95652b7c25f1cb7e8eeee\" (type string) at path \"_id\" for model \"users\""
 ! Use .get() when accessing properties in a Map instead of bracket notation.
*/

/*
 * Register user endpoint
// TODO Hash password with bcrypt
 */
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
 * Login user endpoint
// TODO Hash password with bcrypt
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email}});
        //const valid_ingredients = getIncludedIngredients();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // don't return password
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { register, login, getUserData };
