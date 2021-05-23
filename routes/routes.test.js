process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');

let items = require('../fakeDb');
let item = { name: 'kitkat', price: 3000 };

beforeEach(() => {
	items.push(item);
});
afterEach(() => {
	items.length = 0;
});

describe('test get routes', function () {
	test('test getting all items', async function () {
		const response = await request(app).get('/items');
		expect(response.statusCode).toBe(200);
	});
});

describe('test deletion', function () {
	test('test deleting an item', async function () {
		const response = await request(app).delete(`/items/${item['name']}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: 'Deleted' });
	});

	test('test deleting an item that does not exist', async function () {
		const response = await request(app).delete('/items/123');
		expect(response.body).toEqual({ message: 'Error deleting item' });
	});
});

describe('test post routes', function () {
	test('test creating an item', async function () {
		const response = await request(app).post('/items').send({ name: 'm&ms', price: 20000 });
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ name: 'm&ms', price: 20000 });
	});
});

describe('test updating item', function () {
	test('test patch method', async function () {
		debugger;
		const response = await request(app).patch(`/items/${item['name']}`).send({
			name: 'kitkat',
			price: 500
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			updated: {
				currentData: {
					name: 'kitkat',
					price: 500
				}
			}
		});
	});
});
