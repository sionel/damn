import { Module } from '@nestjs/common'
import { HealthCheckController } from './health-check/health-check.controller'
import { PrismaModule } from './prisma/prisma.module'
import { SessionModule } from './session/session.module'

@Module({
  imports: [SessionModule, PrismaModule],
  controllers: [HealthCheckController],
})
export class InfraModule {}
