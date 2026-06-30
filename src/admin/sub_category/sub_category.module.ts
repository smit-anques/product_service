import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'schema/category.schema';
import { SubCategoryController } from './sub_category.controller';
import { SubCategoryService } from './sub_category.service';
import { SubCategory } from 'schema/sub_category.schema';
import { SubCatrgoryGrpcController } from './sub_catrgory.grpc.controller';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Category,SubCategory]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [SubCategoryController,SubCatrgoryGrpcController],
    providers: [SubCategoryService],
    exports: [SubCategoryService],
})
export class SubCategoryModule { }
