import { Module } from '@nestjs/common';
import { LawsuitsController } from './lawsuits.controller';
import { LawsuitsService } from './lawsuits.service';
import { PortalJustProvider } from './portal-just.provider';

@Module({
  controllers: [LawsuitsController],
  providers: [LawsuitsService, PortalJustProvider],
})
export class LawsuitsModule {}
