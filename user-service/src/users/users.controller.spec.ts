import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      create: jest.fn(dto =>
        Promise.resolve({
          id: 1,
          ...dto,
          created_at: new Date(),
        })
      ),
      findAll: jest.fn(() =>
        Promise.resolve([
          {
            id: 1,
            email: 'test@test.com',
            password: 'password',
            name: 'Test',
            city: 'Paris',
            country: 'France',
            created_at: new Date(),
          },
          {
            id: 2,
            email: 'test2@test.com',
            password: 'password',
            name: 'Test2',
            city: 'Paris',
            country: 'France',
            created_at: new Date(),
          }
        ])
      ),
      findOne: jest.fn(id =>
        Promise.resolve({
          id: Number(id),
          email: 'test@test.com',
          password: 'password',
          name: 'Test',
          city: 'Paris',
          country: 'France',
          created_at: new Date(),
        })
      ),
      update: jest.fn((id, dto) =>
        Promise.resolve({
          id: Number(id),
          ...dto,
        })
      ),
      remove: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      email: 'test@test.com',
      password: 'password',
      name: 'Test',
      city: 'Paris',
      country: 'France',
    };
    await expect(controller.create(dto)).resolves.toEqual(
      expect.objectContaining({
        id: 1,
        ...dto
      })
    );
    expect(usersService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    await expect(controller.findAll()).resolves.toEqual(
      expect.arrayContaining([{ 
        id: 1,
        email: 'test@test.com',
        password: 'password',
        name: 'Test',
        city: 'Paris',
        country: 'France',
        created_at: expect.any(Date)
      }])
    );
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('should return one user', async () => {
    const id = '1';
    await expect(controller.findOne(id)).resolves.toEqual({
      id: 1,
      email: 'test@test.com',
      password: 'password',
      name: 'Test',
      city: 'Paris',
      country: 'France',
      created_at: expect.any(Date),
    });
    expect(usersService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const id = '1';
    const dto = { email: 'updated@test.com' };
    await expect(controller.update(id, dto)).resolves.toEqual(
      expect.objectContaining({
        id: 1, 
        ...dto
      })
    );
    expect(usersService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a user', async () => {
    const id = '1';
    await expect(controller.remove(id)).resolves.toBeUndefined();
    expect(usersService.remove).toHaveBeenCalledWith(1);
  });
});
