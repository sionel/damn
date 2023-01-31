import { Module } from '@nestjs/common'
import { InfraModule } from './infra/infra.module'
import { ConfigModule } from '@nestjs/config'
import { RestModule } from './rest/rest.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    InfraModule,
    RestModule,
  ],
})
export class AppModule {}
