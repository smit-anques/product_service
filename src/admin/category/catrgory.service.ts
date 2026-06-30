import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'common/common.utils';
import { Category } from 'schema/category.schema';
import { PlatformCategory } from 'schema/plateform_category.schema';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CatrgoryService {
    constructor(
        @InjectRepository(Category)
        private readonly CategoryRepository: Repository<Category>,
        @InjectRepository(PlatformCategory)
        private readonly plateformCategoryRepository: Repository<PlatformCategory>,
    ) { }

    async create(body: any) {
        try {
            console.log('CREATE BODY:', body);
            const platformCategoryId = Number(body.platform_category_id);
            if (!platformCategoryId || isNaN(platformCategoryId)) {
                throw new BadRequestException('platform_category_id is required and must be number');
            }
            const platformId = Number(body.platform_category_id);

            if (!platformId) {
                throw new BadRequestException('Invalid platform_category_id');
            }

            const existingplateformCategory =
                await this.plateformCategoryRepository.findOne({
                    where: {
                        id: platformCategoryId,
                        deletedAt: IsNull(),
                    },
                });

            console.log('PLATFORM CATEGORY:', existingplateformCategory);

            if (!existingplateformCategory) {
                throw new NotFoundException('Platform category not found.');
            }

            const existingCategory = await this.CategoryRepository.findOne({
                where: {
                    name: body.name,
                    deletedAt: IsNull(),
                },
            });

            if (existingCategory) {
                throw new BadRequestException(
                    'category already exists.',
                );
            }

            const category = this.CategoryRepository.create({
                platform_category_id: body.platform_category_id,
                name: body.name,
                slug: body.slug ?? generateSlug(body.name),
                image: body.image,
                is_active: body.is_active ?? true,
            });

            const savedCategory =
                await this.CategoryRepository.save(category);

            return savedCategory;
        } catch (error) {
            throw error;
        }
    }

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

    async update(id: number, body: any) {
        try {
            const category = await this.CategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!category) {
                throw new BadRequestException('category not found.');
            }

            // optional duplicate check if name is changing
            if (body.name && body.name !== category.name) {
                const existing = await this.CategoryRepository.findOne({
                    where: {
                        name: body.name,
                        deletedAt: IsNull(),
                    },
                });

                if (existing) {
                    throw new BadRequestException('category already exists.');
                }
            }

            await this.CategoryRepository.update(
                { id },
                {
                    name: body.name ?? category.name,
                    slug: body.slug ?? category.slug,
                    image: body.image ?? category.image,
                    is_active: body.is_active ?? category.is_active,
                    platform_category_id: body.platform_category_id ?? category.platform_category_id,
                },
            );

            return await this.CategoryRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const category = await this.CategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!category) {
                throw new BadRequestException('category not found.');
            }

            await this.CategoryRepository.update(
                { id },
                {
                    deletedAt: new Date(),
                    is_active: false,
                },
            );

            return true;
        } catch (error) {
            throw error;
        }
    }
}
