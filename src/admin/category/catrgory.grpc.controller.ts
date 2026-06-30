import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { CatrgoryService } from './catrgory.service';

@Controller()
export class CatrgoryGrpcController {
  constructor(private readonly CategoryService: CatrgoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(data: any) {
    try {
      console.log('MICROSERVICE RECEIVED:', data);
      const category = await this.CategoryService.create(data);
      return {
        status: true,
        message: 'category created successfully.',
        data: category,
      };
    } catch (error) {
      throw new RpcException(error.message || 'Internal server error');
    }
  }

  @GrpcMethod('CategoryService', 'ListCategories')
  async listCategories() {
    try {
      const categories = await this.CategoryService.findAll();
      return {
        status: true,
        message: 'categories fetched successfully.',
        data: categories,
      };
    } catch (error) {
      throw new RpcException(error.message || 'Internal server error');
    }
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  async updateCategory(data: any) {
    try {
      const category = await this.CategoryService.update(data.id, data);
      return {
        status: true,
        message: 'category updated successfully.',
        data: category,
      };
    } catch (error) {
      throw new RpcException(error.message || 'Internal server error');
    }
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  async deleteCategory(data: any) {
    try {
      await this.CategoryService.delete(data.id);
      return {
        status: true,
message: 'category deleted successfully.',
        data: null,
      };
    } catch (error) {
      throw new RpcException(error.message || 'Internal server error');
    }
  }
}
