import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { CatsModule } from './cats/cats.module';
import { Module } from '@nestjs/common/decorators';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}