const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        //res.send('Auth route')
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

});

module.exports = router;