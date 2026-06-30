import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SubCategoryService } from './sub_category.service';

@Controller()
export class SubCatrgoryGrpcController {
  constructor(private readonly SubCategoryService: SubCategoryService) { }

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
}
