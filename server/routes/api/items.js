const express = require('express');
const router = express.Router();

const Item = require('../../models/item');

//@route GET api/items
//@desc Get all items
//@access public

router.get('/', (req, res) => {
	Item.find()
		.sort({date: -1})
		.then((items) => res.json(items));
});

//@route POST api/items/add
//@desc POST create an item
//@access public

router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name,
	});
	newItem.save().then((items) => res.json(items));
});

//@route DELETE api/items/add
//@desc DELETE delete an item
//@access public

router.delete('/:id', (req, res) => {
	Item.findByIdAndDelete(req.params.id)
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(404));
});

module.exports = router;
