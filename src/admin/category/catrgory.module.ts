import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { JwtModule } from '@nestjs/jwt';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatrgoryController } from './catrgory.controller';
import { CatrgoryService } from './catrgory.service';
import { Category } from 'schema/category.schema';


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([PlatformCategory,Category]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [CatrgoryController],
    providers: [CatrgoryService],
    exports: [CatrgoryService],
})
export class CategoryModule { }
