const request = require('supertest');
const express = require('express');
const flowerController = require('../controllers/flowerController');
const Flower = require('../models/flowerModel');

jest.mock('../models/flowerModel');

const app = express();
app.use(express.json());

app.get('/flowers', flowerController.getAllFlowers);
app.get('/flowers/user/:user_id', flowerController.getFlowersByUserId);
app.post('/flowers', flowerController.createFlower);
app.delete('/flowers/:id', flowerController.deleteFlower);
app.put('/flowers/:id', flowerController.updateFlower);

describe('flowerController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllFlowers should return flowers array', async () => {
    const mockFlowers = [{
        id: 1,
        user_id: 5,
        name: 'Rose',
        plant_type: 'Rosa',
        location: 'Balcony',
        temp_min: 10,
        temp_max: 25,
        humidity_min: 30,
        humidity_max: 60,
        soil_min: 15,
        soil_max: 50,
        light_min: 100,
        light_max: 800
    }];
    Flower.getAllFlowers.mockResolvedValue(mockFlowers);

    const res = await request(app).get('/flowers');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockFlowers);
    expect(Flower.getAllFlowers).toHaveBeenCalled();
  });

  test('getFlowersByUserId should return user flowers', async () => {
    const mockFlowers = [{
        id: 1,
        user_id: 5,
        name: 'Rose',
        plant_type: 'Rosa',
        location: 'Balcony',
        temp_min: 10,
        temp_max: 25,
        humidity_min: 30,
        humidity_max: 60,
        soil_min: 15,
        soil_max: 50,
        light_min: 100,
        light_max: 800
    }];
    Flower.getFlowersByUserId.mockResolvedValue(mockFlowers);

    const res = await request(app).get('/flowers/user/5');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockFlowers);
    expect(Flower.getFlowersByUserId).toHaveBeenCalledWith('5');
  });

  test('createFlower should return the new flower', async () => {
    const flower = {
      user_id: 1,
      name: 'Rose',
      plant_type: 'Rosa',
      location: 'Balcony',
      temp_min: 10,
      temp_max: 30,
      humidity_min: 40,
      humidity_max: 70,
      soil_min: 20,
      soil_max: 60,
      light_min: 200,
      light_max: 800
    };

    const createdFlower = { id: 1, ...flower };
    Flower.createFlower.mockResolvedValue(createdFlower);

    const res = await request(app).post('/flowers').send(flower);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(createdFlower);
    expect(Flower.createFlower).toHaveBeenCalledWith(flower);
  });

  test('deleteFlower should return success message', async () => {
    Flower.deleteFlower.mockResolvedValue({
        id: 1,
        user_id: 5,
        name: 'Rose',
        plant_type: 'Rosa',
        location: 'Balcony',
        temp_min: 10,
        temp_max: 25,
        humidity_min: 30,
        humidity_max: 60,
        soil_min: 15,
        soil_max: 50,
        light_min: 100,
        light_max: 800
    });

    const res = await request(app).delete('/flowers/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted successfully');
    expect(Flower.deleteFlower).toHaveBeenCalledWith('1');
  });

  test('updateFlower should return updated flower', async () => {
    const updated = {
      user_id: 2,
      name: 'Rosee',
      plant_type: 'Rosa',
      location: 'Balcony',
      temp_min: 5,
      temp_max: 25,
      humidity_min: 30,
      humidity_max: 60,
      soil_min: 15,
      soil_max: 50,
      light_min: 100,
      light_max: 500
    };

    Flower.updateFlower.mockResolvedValue({ id: 2, ...updated });

    const res = await request(app).put('/flowers/2').send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.flower.name).toBe('Rosee');
    expect(Flower.updateFlower).toHaveBeenCalledWith('2', updated);
  });

  test('createFlower should return 400 if user_id is missing', async () => {
    const flower = {
      name: 'Rose',
      plant_type: 'Rosa'
    };

    const res = await request(app).post('/flowers').send(flower);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('user_id are required.');
  });
});
