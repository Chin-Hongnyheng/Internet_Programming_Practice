import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { Receipt } from './entities/receipts.entity';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

@Module({
  imports: [DatabaseModule.forFeature([Receipt])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}