import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubCategoryService } from './sub_category.service';

@Controller('api/admin/sub-category')
export class SubCategoryController {
    constructor(
        private readonly SubCategoryService: SubCategoryService,
    ) { }

    @Post('/create')
    async createPlatformCategory(
        @Body() body: any
    ) {
        try {
            const category = await this.SubCategoryService.create(body);
            return {
                status: true,
                message: 'sub category created successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

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

    @Put('update/:id')
    async updateplateformCategory(
        @Param('id') id: number,
        @Body() body: any
    ) {
        try {
            const category = await this.SubCategoryService.update(id, body);
            return {
                status: true,
                message: 'sub category updated successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @Delete('delete/:id')
    async deleteplateformCategory(
        @Param('id') id: number,
        @Body() body: any
    ) {
        try {
            await this.SubCategoryService.update(id, body);
            return {
                status: true,
                message: 'sub category deleted successfully.',
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
}
