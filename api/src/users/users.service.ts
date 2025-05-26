import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id }});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.userRepository.update(id, updateUserDto);
    return res;
  }

  async remove(id: number) {
    const userToDelete = await this.findOne(id);
    if (userToDelete) {
      return await this.userRepository.remove(userToDelete);
    };
  }
}
