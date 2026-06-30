import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SubCategoryService } from './sub_category.service';

@Controller()
export class SubCatrgoryGrpcController {
  constructor(private readonly SubCategoryService: SubCategoryService) { }

  @GrpcMethod('SubCategoryService', 'CreateSubCategory')
  async createSubCategory(data: any) {
    try {
      const category = await this.SubCategoryService.create(data);
      console.log('MICROSERVICE RECEIVED:', data);
      return {
        status: true,
        message: 'sub category created successfully.',
        data: category,
      };
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  @GrpcMethod('SubCategoryService', 'ListSubCategories')
  async listSubCategories() {
    try {
      const categories = await this.SubCategoryService.findAll();
      return {
        status: true,
        message: 'sub categories fetched successfully.',
        data: categories,
      };
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  @GrpcMethod('SubCategoryService', 'UpdateSubCategory')
  async updateSubCategory(data: any) {
    try {
      const category = await this.SubCategoryService.update(data.id, data);
      return {
        status: true,
        message: 'sub category updated successfully.',
        data: category,
      };
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  @GrpcMethod('SubCategoryService', 'DeleteSubCategory')
  async deleteSubCategory(data: any) {
    try {
      await this.SubCategoryService.delete(data.id);
      return {
        status: true,
        message: 'sub category deleted successfully.',
        data: null,
      };
    } catch (error) {
      return { status: false, message: error.message }
    }
  }
}
