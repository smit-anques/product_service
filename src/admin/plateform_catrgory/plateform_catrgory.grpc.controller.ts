import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlateformCatrgoryService } from './plateform_catrgory.service';

@Controller()
export class PlateformCatrgoryGrpcController {
    constructor(private readonly plateformCategoryService: PlateformCatrgoryService) { }

    @GrpcMethod('PlateformCategoryService', 'CreatePlatformCategory')
    async createPlatformCategory(data: any) {
        try {
            const category = await this.plateformCategoryService.create(data);
            return {
                status: true,
                message: 'Platform category created successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @GrpcMethod('PlateformCategoryService', 'ListPlatformCategories')
    async listPlatformCategories() {
        try {
            const categories = await this.plateformCategoryService.findAll();
            return {
                status: true,
                message: 'Platform categories fetched successfully.',
                data: categories,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @GrpcMethod('PlateformCategoryService', 'UpdatePlatformCategory')
    async updatePlatformCategory(data: any) {
        try {
            const category = await this.plateformCategoryService.update(data.id, data);
            return {
                status: true,
                message: 'Platform category updated successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @GrpcMethod('PlateformCategoryService', 'DeletePlatformCategory')
    async deletePlatformCategory(data: any) {
        try {
            await this.plateformCategoryService.delete(data.id);
            return {
                status: true,
                message: 'Platform category deleted successfully.',
                data: null,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
}
