const Flower = require('../models/flowerModel');

describe('flowerModel', () => {
  let newFlower;

  const testFlower = {
    user_id: 1,
    name: 'Rose',
    species: 'Rosa',
    location: 'Balcony',
    temp_min: 10,
    temp_max: 30,
    humidity_min: 40,
    humidity_max: 80,
    soil_min: 20,
    soil_max: 60,
    light_min: 1000,
    light_max: 5000
  };

  test('createFlower should create a flower', async () => {
    newFlower = await Flower.createFlower(testFlower);
    expect(newFlower).toHaveProperty('id');
    expect(newFlower.name).toBe('Rose');
  });

  test('getAllFlowers should return an array with all the flowers', async () => {
    const flowers = await Flower.getAllFlowers();
    expect(Array.isArray(flowers)).toBe(true);
    expect(flowers.length).toBeGreaterThan(0);
    expect(flowers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Rose' })
      ])
    );
  });

  test("getFlowersByUserId should return the user's flowers", async () => {
    const flowers = await Flower.getFlowersByUserId(1);
    expect(Array.isArray(flowers)).toBe(true);
    expect(flowers.length).toBeGreaterThan(0);
    expect(flowers[0].user_id).toBe(1);
  });

  test('updateFlower should update the flower', async () => {
    const updated = await Flower.updateFlower(newFlower.id, {
      ...testFlower,
      name: 'Updated Rose'
    });

    expect(updated.name).toBe('Updated Rose');
  });

  test('deleteFlower should delete the flower', async () => {
    const deleted = await Flower.deleteFlower(newFlower.id);
    expect(deleted.id).toBe(newFlower.id);

    const flowers = await Flower.getAllFlowers();
    expect(flowers.find(f => f.id === newFlower.id)).toBeUndefined();
  });

  test('deleteFlower should get an error if flower not found', async () => {
    await expect(Flower.deleteFlower(2)).rejects.toThrow('No flower found with id 2');
  });

  test('updateFlower should get an error if flower not found', async () => {
    await expect(
      Flower.updateFlower(2, testFlower)
    ).rejects.toThrow('No flower found with id 2');
  });
});
