import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Recommendation)
    private recommendationRepo: Repository<Recommendation>,
  ) {}
  
  async create(dto: CreateRecommendationDto) {
    const existing = await this.recommendationRepo.findOne({
      where: { user_id: dto.user_id },
    });

    if (existing) {
      existing.token = dto.token;
      return this.recommendationRepo.save(existing);
    }

    const recommendation = this.recommendationRepo.create(dto);
    return this.recommendationRepo.save(recommendation);
  }

  async findAll() {
    return this.recommendationRepo.find();
  }

  async findOne(id: number) {
    return this.recommendationRepo.findOne({ where: { id } });
  }

  async update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    await this.recommendationRepo.update(id, updateRecommendationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.recommendationRepo.delete(id);
  }
}
