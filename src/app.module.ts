import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from 'config/db.config';
import { ScheduleModule } from '@nestjs/schedule';
import { PlateformCatrgoryController } from './admin/plateform_catrgory/plateform_catrgory.controller';
import { PlateformCatrgoryService } from './admin/plateform_catrgory/plateform_catrgory.service';
import { PlateformCategoryModule } from './admin/plateform_catrgory/plateform_catrgory.module';
import { CategoryModule } from './admin/category/catrgory.module';
import { UserPlateformCategoryModule } from './user/plateform_category/plateform_catrgory.module';
import { UserCategoryModule } from './user/category/catrgory.module';
import { SubCategoryModule } from './admin/sub_category/sub_category.module';
import { UserSubCategoryModule } from './user/sub_category/sub_category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    PlateformCategoryModule,
    CategoryModule,
    UserPlateformCategoryModule,
    UserCategoryModule,
    SubCategoryModule,
    UserSubCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
