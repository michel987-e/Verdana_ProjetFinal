import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private flowerRepository: Repository<Flower>
  ) {}

  async create(createFlowerDto: CreateFlowerDto) {
    return await this.flowerRepository.save(createFlowerDto);
  }

  async findAll() {
    return await this.flowerRepository.find();
  }

  async findOne(id: number) {
    return await this.flowerRepository.findOne({ where: { id }});
  }

  async update(id: number, updateFlowerDto: UpdateFlowerDto) {
    const res = await this.flowerRepository.update(id, updateFlowerDto);
    return res;
  }

  async remove(id: number) {
    const flowerToDelete = await this.findOne(id);
    if (flowerToDelete) {
      return await this.flowerRepository.remove(flowerToDelete);
    };
  }
}
