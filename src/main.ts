import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,

      options: {
        package: [
          'platform_category',
          'category',
          'sub_category'
        ],

        protoPath: [
          join(process.cwd(), 'proto', 'plateform_category', 'plateform_category.proto'),
          join(process.cwd(), 'proto', 'Category', 'category.proto'),
          join(process.cwd(), 'proto', 'sub_category', 'sub_category.proto'),

        ],

        url: 'localhost:50052',
        loader: {
          keepCase: true, // <-- add this here too
        },
      },
    },
  );

  await app.listen();

  console.log('✅ Product Service running on gRPC :50052');
}
bootstrap();
