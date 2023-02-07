const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../model/User');
const bcrypt = require('bcryptjs');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please incude a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            })
        }

        user = new User({
            name,
            email,
            password
        });

        //Encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        // Return jwt
        res.send('User registered');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;