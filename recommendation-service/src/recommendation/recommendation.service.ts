import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

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
      console.log(existing);
      return this.recommendationRepo.save(existing);
    }

    const recommendation = this.recommendationRepo.create(dto);
    console.log(recommendation);
    return this.recommendationRepo.save(recommendation);
  }

  async findAll() {
    return this.recommendationRepo.find();
  }

  async findOne(id: number) {
    return this.recommendationRepo.findOne({ where: { user_id: id } });
  }

  async update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    await this.recommendationRepo.update(id, updateRecommendationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.recommendationRepo.delete(id);
  }

  async sendPushNotif(token: string) {
    const message = {
      to: token,
      sound: 'default',
      title: 'Alert',
      body: 'Les capteurs détectent une anomalie sur votre plante !',
      data: { message: 'Alert' },
    }
    try {
      const response = await axios.post(
        'https://exp.host/--/api/v2/push/send',
        message,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate'
          },
        },
      );
      console.log('Push notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
