import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    })
    .compile();

    service = moduleRef.get(UsersService);
    repo = moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const dto = {
        email: 'test@test.com',
        password: 'password',
        name: 'John',
        city: 'Paris',
        country: 'France',
      };

      const user = { id: 1, ...dto, created_at: new Date() };
      repo.create.mockReturnValue(user);
      repo.save.mockResolvedValue(user);

      await expect(service.create(dto)).resolves.toEqual(user);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(user);
    });
  });


  it('should find all users', async () => {
    const users = [
      {
        id: 1,
        email: 'test1@test.com',
        password: 'password',
        name: 'Test1',
        city: 'Paris',
        country: 'France',
        created_at: new Date(),
      },
      {
        id: 2,
        email: 'test2@test.com',
        password: 'password',
        name: 'Test2',
        city: 'Lyon',
        country: 'France',
        created_at: new Date(),
      },
    ];

    repo.find.mockResolvedValue(users);

    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      password: 'password',
      name: 'Test',
      city: 'Paris',
      country: 'France',
      created_at: new Date(),
    };

    repo.findOne.mockResolvedValue(user);

    const result = await service.findOne(1);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const updatedUser = {
      id: 1,
      email: 'updated@test.com',
      password: 'password',
      name: 'Updated Test',
      city: 'Marseille',
      country: 'France',
      created_at: new Date(),
    };

    repo.update.mockResolvedValue(undefined);
    repo.findOne.mockResolvedValue(updatedUser);

    const result = await service.update(1, { email: 'updated@test.com' });

    expect(repo.update).toHaveBeenCalledWith(1, { email: 'updated@test.com' });
    expect(result).toEqual(updatedUser);
  });


  it('should remove a user', async () => {
    repo.delete.mockResolvedValue(undefined);

    await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
