const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../../models/users');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/users');

//@route GET api/auth
//@desc Get the auth
//@access public

router.get('/', (req, res) => {
	Users.find()
		.sort({date: -1})
		.then((items) => res.json(items));
});

//@route GET api/auth/user
//@desc GET create an user
//@access public

router.get('/user', auth, (req, res) => {
	Users.findById(req.body.id)
		.select('-password')
		.then((user) => {
			res.json(user);
		});
});

router.post('/', (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json({msg: 'Please enter all fields'});
	}
	Users.findOne({email}).then((user) => {
		if (!user) return res.status(400).json({msg: 'User does not exists'});
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({msg: 'invalid credentials'});
			jwt.sign({id: user.id}, config.get('secretJWT'), {expiresIn: 3600}, (err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
					},
				});
			});
		});
	});
});

module.exports = router;
