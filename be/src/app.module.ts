import { Module } from '@nestjs/common';
import { LawsuitsModule } from './lawsuits/lawsuits.module';

@Module({
  imports: [LawsuitsModule],
})
export class AppModule {}
