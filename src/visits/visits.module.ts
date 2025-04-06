import { Module } from '@nestjs/common';
import { VisitService } from './visits.service';
import { VisitController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    BullModule.registerQueue({
      name: 'visits',
    }),
  ],
  controllers: [VisitController],
  providers: [VisitService],
  exports: [VisitService, TypeOrmModule, BullModule],
})
export class VisitsModule {}
