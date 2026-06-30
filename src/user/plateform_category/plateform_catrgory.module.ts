import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { JwtModule } from '@nestjs/jwt';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateformCatrgoryController } from './plateform_catrgory.controller';
import { PlateformCatrgoryGrpcController } from './plateform_catrgory.grpc.controller';
import { PlateformCatrgoryService } from './plateform_catrgory.service';


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([PlatformCategory]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [PlateformCatrgoryController, PlateformCatrgoryGrpcController],
    providers: [PlateformCatrgoryService],
    exports: [PlateformCatrgoryService],
})
export class UserPlateformCategoryModule { }
