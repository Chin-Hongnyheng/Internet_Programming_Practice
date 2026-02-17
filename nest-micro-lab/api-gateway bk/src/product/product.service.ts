import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPO')
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(data: Partial<Product>) {
    // TODO: implement create + save
  }

  async findAll() {
    // TODO
  }

  async findOne(id: string) {
    // TODO: throw NotFoundException if not found
  }

  async update(id: string, data: Partial<Product>) {
    // TODO
  }

  async remove(id: string) {
    // TODO
  }
}