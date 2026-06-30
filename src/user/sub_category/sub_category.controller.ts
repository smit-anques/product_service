import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubCategoryService } from './sub_category.service';

@Controller('api/user/sub-category')
export class SubCategoryController {
    constructor(
        private readonly SubCategoryService: SubCategoryService,
    ) { }

    @Get('/list')
    async findAll() {
        try {
            const response = await this.SubCategoryService.findAll();

            return {
                status: true,
                message: 'sub categories fetched successfully.',
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
