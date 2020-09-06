const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../../models/users');
const config = require('config');
const jwt = require('jsonwebtoken');

//@route GET api/users
//@desc Get all users
//@access public

router.get('/', (req, res) => {
	Users.find()
		.sort({date: -1})
		.then((items) => res.json(items));
});

//@route POST api/users
//@desc POST create an user
//@access public

router.post('/', (req, res) => {
	const {name, email, password} = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({msg: 'Please enter all fields'});
	}
	Users.findOne({email}).then((user) => {
		if (user) return res.status(400).json({msg: 'User already exists'});

		const newUser = new Users({
			name,
			email,
			password,
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

module.exports = router;
