import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CatrgoryService } from './catrgory.service';

@Controller('api/admin/category')
export class CatrgoryController {
    constructor(
        private readonly CategoryService: CatrgoryService,
    ) { }

    @Post('/create')
    async createPlatformCategory(
        @Body() body: any
    ) {
        try {
            const category = await this.CategoryService.create(body);
            return {
                status: true,
                message: 'category created successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @Get('/list')
    async findAll() {
        try {
            const response = await this.CategoryService.findAll();

            return {
                status: true,
                message: 'categories fetched successfully.',
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
    async updateCategory(
        @Param('id') id: number,
        @Body() body: any
    ) {
        try {
            const category = await this.CategoryService.update(id, body);
            return {
                status: true,
                message: 'category updated successfully.',
                data: category,
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    @Delete('delete/:id')
    async deleteCategory(
        @Param('id') id: number,
        @Body() body: any
    ) {
        try {
            const category = await this.CategoryService.update(id, body);
            return {
                status: true,
                message: 'category deleted successfully.',
            };
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
}