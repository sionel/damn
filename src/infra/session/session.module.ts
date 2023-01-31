import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { ConfigService } from '@nestjs/config'
import { SessionService } from './session.service'

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          config: {
            host: configService.get<string>('redis_host'),
            port: configService.get<number>('redis_port'),
            password: configService.get<string>('redis_password'),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
