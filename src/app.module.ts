import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ItemsModule } from './items/items.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
