import { Module } from '@nestjs/common'
import { InfraModule } from './infra/infra.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './rest/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '',
    }),
    InfraModule,
    UserModule,
  ],
})
export class AppModule {}
