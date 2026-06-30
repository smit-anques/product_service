import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserCatrgoryService } from './catrgory.service';

@Controller('api/user/category')
export class UserCatrgoryController {
    constructor(
        private readonly CategoryService: UserCatrgoryService,
    ) { }

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
}