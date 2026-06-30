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

    async create(body: any) {
        try {
            const existingCategory = await this.platformCategoryRepository.findOne({
                where: {
                    name: body.name,
                    deletedAt: IsNull(),
                },
            });

            if (existingCategory) {
                throw new BadRequestException(
                    'Platform category already exists.',
                );
            }

            const category = this.platformCategoryRepository.create({
                name: body.name,
                slug: body.slug ?? generateSlug(body.name),
                image: body.image,
                is_active: body.is_active ?? true,
            });

            const savedCategory =
                await this.platformCategoryRepository.save(category);

            return savedCategory;
        } catch (error) {
            throw error;
        }
    }

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

    async update(id: number, body: any) {
        try {
            const category = await this.platformCategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!category) {
                throw new BadRequestException('Platform category not found.');
            }

            // optional duplicate check if name is changing
            if (body.name && body.name !== category.name) {
                const existing = await this.platformCategoryRepository.findOne({
                    where: {
                        name: body.name,
                        deletedAt: IsNull(),
                    },
                });

                if (existing) {
                    throw new BadRequestException('Platform category already exists.');
                }
            }

            await this.platformCategoryRepository.update(
                { id },
                {
                    name: body.name ?? category.name,
                    slug: body.slug ?? category.slug,
                    image: body.image ?? category.image,
                    is_active: body.is_active ?? category.is_active,
                },
            );

            return await this.platformCategoryRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const category = await this.platformCategoryRepository.findOne({
                where: {
                    id,
                    deletedAt: IsNull(),
                },
            });

            if (!category) {
                throw new BadRequestException('Platform category not found.');
            }

            await this.platformCategoryRepository.update(
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
