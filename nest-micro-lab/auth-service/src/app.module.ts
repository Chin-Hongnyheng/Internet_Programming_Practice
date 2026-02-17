import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { UsersModule } from './users/users.module';
import { RbacModule } from './rbac/rbac.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule, AuthsModule, UsersModule, RbacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}