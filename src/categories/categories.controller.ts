import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category>{
        return await this.categoriesService.createCategories(createCategoryDto);
    }

    @Get()
    async getAllCategories(): Promise<Array<Category>>{
        return await this.categoriesService.getAllCategories();
    }

    @Get('/:category')
    async getCategoryById(@Param('category') category: string): Promise<Category>{
        return await this.categoriesService.getCategoryById(category);
    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('category') category: string): Promise<Category>{
             return await this.categoriesService.updateCategory(category, updateCategoryDto);
    }

    @Post('/:category/jogadores/:id')
    async attCategoryJogador(
        @Param() params: string[]): Promise<void>{
            // console.log(JSON.stringify(params));
            await this.categoriesService.attrCategoryJogador(params);
    }
}
