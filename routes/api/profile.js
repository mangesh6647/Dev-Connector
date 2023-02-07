const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../model/Profile');
const User = require('../../model/User');

/**
 * @description get current user profile
 * @route api/auth/me
 */
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;