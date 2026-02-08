import { Controller, Get, Query } from '@nestjs/common';
import { LawsuitsService } from './lawsuits.service';
import type { LawsuitResponse } from './interfaces/lawsuit.interface';

@Controller('lawsuits')
export class LawsuitsController {
  constructor(private readonly lawsuitsService: LawsuitsService) {}

  @Get()
  async search(
    @Query('caseNumber') caseNumber: string,
  ): Promise<LawsuitResponse> {
    return this.lawsuitsService.findByCase(caseNumber);
  }
}
