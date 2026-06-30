import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'common/common.utils';
import { Category } from 'schema/category.schema';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { SubCategory } from 'schema/sub_category.schema';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory)
        private readonly subCategoryRepository: Repository<SubCategory>,
    ) { }

    async findAll() {
        try {
            const subcategories = await this.subCategoryRepository.find({
                where: {
                    deletedAt: IsNull(),
                },
                order: {
                    id: 'DESC',
                },
            });

            return subcategories;
        } catch (error) {
            throw error;
        }
    }

}
