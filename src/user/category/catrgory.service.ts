import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'common/common.utils';
import { Category } from 'schema/category.schema';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UserCatrgoryService {
    constructor(
        @InjectRepository(Category)
        private readonly CategoryRepository: Repository<Category>,
    ) { }

    async findAll() {
        try {
            const categories = await this.CategoryRepository.find({
                where: {
                    deletedAt: IsNull(),
                },
                order: {
                    id: 'DESC',
                },
            });

            return categories;
        } catch (error) {
            throw error;
        }
    }
}
