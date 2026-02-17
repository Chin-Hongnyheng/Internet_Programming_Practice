import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(data: Partial<Category>) {
    // TODO: implement create + save
  }

  async findAll() {
    // TODO
  }

  async findOne(id: string) {
    // TODO: throw NotFoundException if not found
  }

  async update(id: string, data: Partial<Category>) {
    // TODO
  }

  async remove(id: string) {
    // TODO
  }
}