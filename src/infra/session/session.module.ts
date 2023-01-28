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
            host: configService.get('host'),
            port: configService.get('port'),
            password: configService.get('password'),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SessionService],
})
export class SessionModule {}
