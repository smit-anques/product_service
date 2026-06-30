import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CatrgoryService } from './catrgory.service';

@Controller()
export class CatrgoryGrpcController {
  constructor(private readonly CategoryService: CatrgoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(data: any) {
    const category = await this.CategoryService.create(data);
    console.log('MICROSERVICE RECEIVED:', data);
    return {
      status: true,
      message: 'category created successfully.',
      data: category,
    };
  }

  @GrpcMethod('CategoryService', 'ListCategories')
  async listCategories() {
    const categories = await this.CategoryService.findAll();
    return {
      status: true,
      message: 'categories fetched successfully.',
      data: categories,
    };
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  async updateCategory(data: any) {
    const category = await this.CategoryService.update(data.id, data);
    return {
      status: true,
      message: 'category updated successfully.',
      data: category,
    };
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  async deleteCategory(data: any) {
    await this.CategoryService.delete(data.id);
    return {
      status: true,
      message: 'category deleted successfully.',
      data: null,
    };
  }
}
