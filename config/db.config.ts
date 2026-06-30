import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'schema/category.schema';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { ProductImage } from 'schema/product_images.schema';
import { Product } from 'schema/products.schema';
import { SubCategory } from 'schema/sub_category.schema';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Product,ProductImage,Category,SubCategory,PlatformCategory],
    synchronize: false,
});