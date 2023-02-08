const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../model/Post');
const User = require('../../model/User');
const Profile = require('../../model/Profile');

/**
 * @route api/posts
 * @description Create a post 
 */
router.post('/',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = Post({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            });
            const post = await newPost.save();

            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }


    }
);


/**
 * @route api/posts
 * @description Get all posts
 */
router.get('/', auth, async (req, res) => {
    try {
        //sort according to most recent post
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;