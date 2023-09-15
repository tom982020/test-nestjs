import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      authSource: 'admin',
      directConnection: true,
      autoIndex: true, // dont build indexes
      maxPoolSize: 10,
      family: 4, // connect by IPV4
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
