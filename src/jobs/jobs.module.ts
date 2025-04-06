import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VisitProcessor } from './visit.processor';
import { VisitsModule } from 'src/visits/visits.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'visits',
    }),
    VisitsModule,
  ],
  providers: [VisitProcessor],
})
export class JobsModule {}
