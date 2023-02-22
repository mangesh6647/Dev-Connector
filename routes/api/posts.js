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

/**
 * @route api/posts/:id
 * @description Get post by id
 */
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


/**
 * @route api/posts/:id
 * @description Delete a post
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        //sort according to most recent post
        const post = await Post.findById(req.params.id);

        //Check if user is deleting his own post
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route api/posts/like/:id
 * @description Like a post
 */

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the post is already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        return res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

/**
 * @route api/posts/unlike/:id
 * @description Unlike a post
 */

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the post is already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        return res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


/**
 * @route api/posts/comment/:id
 * @description Comment on a post 
 */
router.post('/comment/:id',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            post.save();

            res.json(post.comments);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }


    }
);


/**
 * @route api/posts/comment/:id/:comment_id
 * @description Delete a comment
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Pull out comment from post
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        //Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        //Check if user is deleting his own comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }


        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;