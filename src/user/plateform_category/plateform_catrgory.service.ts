import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'common/common.utils';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class PlateformCatrgoryService {
    constructor(
        @InjectRepository(PlatformCategory)
        private readonly platformCategoryRepository: Repository<PlatformCategory>,
    ) { }

    async findAll() {
        try {
            const categories = await this.platformCategoryRepository.find({
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
