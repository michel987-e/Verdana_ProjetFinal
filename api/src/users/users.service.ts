import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async create(data: any) {
    const result = await this.db.query(
      `INSERT INTO users (email, password, name, city, country)
       VALUES ($1, $2, $3, $4, $5)*`,
      [data.email, data.password, data.name, data.city, data.country]
    );
    return result[0];
  }

  async findAll() {
    const result = await this.db.query(`SELECT * FROM users`);
    return result;
  }

  async findOne(id: number) {
    const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result[0];
  }
}
