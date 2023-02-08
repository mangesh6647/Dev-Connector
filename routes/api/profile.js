const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');

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

/**
 * @route api/profie
 * @description create or update user profile
 */
router.post('/',
    auth,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
        } = req.body;

        // build a profile
        const profileFields = {
        }
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //Build social object
        profileFields.social = {};

        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

    }
)


/**
* @route    api/profile
* @description Get all profiles
*/

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

/**
* @route    api/profile/user/:user_id
* @description Get profile by user id
*/
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.json(profile)

    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


/**
* @route    api/profile
* @description Delete profile, user & posts
*/

router.delete('/', auth, async (req, res) => {
    try {
        //Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

/**
* @route    api/profile/experience
* @description Add profile experience
*/

router.put('/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required ').notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            //Unshift is same as push difference is most recent will be at top
            profile.experience.unshift(req.body);

            await profile.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

/**
* @route    api/profile/experience/:exp_id
* @description Delete experience from profile
*/

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        console.log(removeIndex)
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;