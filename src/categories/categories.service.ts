import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/categories.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly jogadoresService: JogadoresService){}

    async createCategories(createCategoryDto: CreateCategoryDto) : Promise<Category>{
        const { category } = createCategoryDto;
        const categoryFound = await this.categoryModel.findOne({category}).exec();

        if(categoryFound)
            throw new BadRequestException(`Já existe uma categoria com o nome ${category}`);

        const newCategory = await this.categoryModel.create(createCategoryDto);

        return newCategory;
    }

    async getAllCategories(): Promise<Array<Category>>{
        return await this.categoryModel.find().populate('jogadores').exec();
    }

    async getCategoryById(category: string): Promise<Category>{
        const categoryFound = await this.categoryModel.findOne({category}).exec();

        if(!categoryFound)
            throw new NotFoundException(`Categoria ${category} não encontrada!`);
        
        return categoryFound;
    }

    async updateCategory(category: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>{
        const categoryFound = await this.categoryModel.findOne({category}).exec();

        if(!categoryFound)
            throw new NotFoundException(`Categoria ${category} não cadastrada!`);

       const updateCategory = await this.categoryModel.findOneAndUpdate({category}, {set: updateCategoryDto}).exec();

       return updateCategory;
    }

    async attrCategoryJogador(params: string[]): Promise<void>{
        const category = params['category'];
        const jogador_id = params['id'];

        const categoryFound = await this.categoryModel.findOne({category}).exec();

        const jogadorCategoryFound = await this.categoryModel.find({category}).where('jogadores').in(jogador_id).exec();

        await this.jogadoresService.getJogadorById(jogador_id);

        if(!categoryFound)
            throw new NotFoundException(`Categoria ${category} não cadastrada`);

        if(jogadorCategoryFound.length > 0)
            throw new BadRequestException(`Jogador com id ${jogador_id} já cadastrado na categoria ${category}`);

        categoryFound.jogadores.push(jogador_id);
        // await this.categoryModel.findOneAndUpdate({category},{set: categoryFound}).exec();
        await this.categoryModel.updateOne({category},{set: categoryFound}).exec();
    }
}
