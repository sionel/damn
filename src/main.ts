import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as cookieParseser from 'cookie-parser'
import { PrismaService } from './infra/prisma/prisma.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParseser())

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}

bootstrap()
