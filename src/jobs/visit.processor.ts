import { Processor, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { VisitService } from 'src/visits/visits.service';


@Processor('visits')
export class VisitProcessor {
  constructor(private readonly visitService: VisitService) {}

  @OnWorkerEvent('active')
  async handleVisit(job: Job) {
    const { linkId, ipAddress, userAgent } = job.data;
    await this.visitService.create({ linkId, ipAddress, userAgent });
  }
}