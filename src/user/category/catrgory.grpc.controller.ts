import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserCatrgoryService } from './catrgory.service';

@Controller()
export class UserCatrgoryGrpcController {
  constructor(private readonly CategoryService: UserCatrgoryService) {}

  @GrpcMethod('CategoryService', 'ListCategories')
  async listCategories() {
    const categories = await this.CategoryService.findAll();
    return {
      status: true,
      message: 'categories fetched successfully.',
      data: categories,
    };
  }
}
