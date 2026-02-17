import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
  exports: [ProductService],
})
export class ProductModule {}