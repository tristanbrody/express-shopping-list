// GET /items - this should render a list of shopping items.
// Here is what a response looks like:

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:

// {“name”: “popsicle”, “price”: 1.45}

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// DELETE /items/:name - this route should allow you to delete a specific item from the array.

// Here is what a sample response looks like:

// {message: “Deleted”}

const express = require('express');
const router = new express.Router();
const items = require('../fakeDb.js');

router.get('/', (req, res) => {
	res.json(global.items);
});

router.post('/', (req, res) => {
	const positionPushed = global.items.push({ name: req.body.name, price: +req.body.price });
	res.json(global.items[positionPushed - 1]);
});

router.get('/:name', (req, res) => {
	res.json(global.items[req.body.name]);
});

router.patch('/:name', (req, res) => {
	try {
		const currentData = global.items.find(el => req.body.name === el.name);
		currentData['price'] = req.body.price;
		res.json({ updated: { currentData } });
	} catch (err) {
		res.json({ message: 'Error updating item' });
	}
});

router.delete('/:name', (req, res) => {
	try {
		const toDelete = global.items.find(function (el) {
			return req.params.name === el.name;
		});
		if (toDelete === undefined) {
			throw new Error();
		} else {
			global.items.pop(toDelete);
			res.json({ message: 'Deleted' });
		}
	} catch (err) {
		res.json({ message: 'Error deleting item' });
	}
});

module.exports = router;
