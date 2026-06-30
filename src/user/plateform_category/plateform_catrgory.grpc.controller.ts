import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlateformCatrgoryService } from './plateform_catrgory.service';

@Controller()
export class PlateformCatrgoryGrpcController {
    constructor(private readonly plateformCategoryService: PlateformCatrgoryService) { }

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
}
