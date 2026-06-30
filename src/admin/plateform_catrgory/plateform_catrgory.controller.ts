import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PlateformCatrgoryService } from './plateform_catrgory.service';

@Controller('api/user/platform-category')
export class PlateformCatrgoryController {
    constructor(
        private readonly plateformCategoryService: PlateformCatrgoryService,
    ) { }

    @Get('/list')
    async findAll() {
        try {
            const response = await this.plateformCategoryService.findAll();

            return {
                status: true,
                message: 'Platform categories fetched successfully.',
                data: response,
            };
        } catch (error) {
            return {
                status: false,
                message: error.message,
            };
        }
    }
}