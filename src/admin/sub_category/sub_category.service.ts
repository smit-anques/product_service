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
        @InjectRepository(Category)
        private readonly CategoryRepository: Repository<Category>,
        @InjectRepository(SubCategory)
        private readonly subCategoryRepository: Repository<SubCategory>,
    ) { }

    async create(body: any) {
        try {
            const CategoryId = Number(body.category_id);
            if (!CategoryId || isNaN(CategoryId)) {
                throw new BadRequestException('platform_category_id is required and must be number');
            }
            const categoryId = Number(body.category_id);

            if (!categoryId) {
                throw new BadRequestException('Invalid category_id');
            }

            const existingCategory = await this.CategoryRepository.findOne({
                where: {
                    id: categoryId,
                    deletedAt: IsNull(),
                },
            });

            if (!existingCategory) {
                throw new BadRequestException(
                    'category not found.',
                );
            }

            const existingsubCategory = await this.subCategoryRepository.findOne({
                where: {
                    name: body.name,
                    deletedAt: IsNull(),
                },
            });

            if (existingsubCategory) {
                throw new BadRequestException(
                    'sub category already exists.',
                );
            }

            const category = this.subCategoryRepository.create({
                category_id:body.category_id,
                name: body.name,
                slug: body.slug ?? generateSlug(body.name),
                image: body.image,
                is_active: body.is_active ?? true,
            });

            const savedCategory =
                await this.subCategoryRepository.save(category);

            return savedCategory;
        } catch (error) {
            throw error;
        }
    }

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

    async update(id: number, body: any) {
        try {
            const subcategory = await this.subCategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!subcategory) {
                throw new BadRequestException('sub category not found.');
            }

            // optional duplicate check if name is changing
            if (body.name && body.name !== subcategory.name) {
                const existing = await this.subCategoryRepository.findOne({
                    where: {
                        name: body.name,
                        deletedAt: IsNull(),
                    },
                });

                if (existing) {
                    throw new BadRequestException('sub category already exists.');
                }
            }

            await this.subCategoryRepository.update(
                { id },
                {
                    name: body.name ?? subcategory.name,
                    slug: body.slug ?? subcategory.slug,
                    image: body.image ?? subcategory.image,
                    is_active: body.is_active ?? subcategory.is_active,
                    category_id: body.category_id ?? subcategory.category_id,
                },
            );

            return await this.subCategoryRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const subcategory = await this.subCategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!subcategory) {
                throw new BadRequestException('sub category not found.');
            }

            await this.subCategoryRepository.update(
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
