import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dto/jogadores.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJogadorDto } from './dto/update-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async getAllJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec();
    }

    async getJogadorById(_id: string): Promise<Jogador>{
        const jogadorFound = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorFound)
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);

        return jogadorFound;
    }
    
    async getJogadorByEmail(email: string): Promise<Jogador | Jogador[]>{
        
        const jogadorFound = this.jogadorModel.findOne({email}).exec();
    
        if(!jogadorFound)
            throw new NotFoundException(`Jogador com email ${email} não encontrado!`);
    
        return jogadorFound;

    }

    async updateJogador(_id: string, updateJogadorDto: UpdateJogadorDto) : Promise<void>{
        const jogadorFound = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorFound)
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);

        await this.jogadorModel.findOneAndUpdate({_id}, {$set: updateJogadorDto}).exec();
    }

    async createJogador(createJogadorDto: CreateJogadorDto): Promise<Jogador>{

        const { email } = createJogadorDto;
        const jogadorFound = await this.jogadorModel.findOne({email}).exec();

        if(jogadorFound)
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`);

        const jogadorCreated = new this.jogadorModel(createJogadorDto);

        return await jogadorCreated.save();

    }

    async deleteJogador(_id: string): Promise<any>{
        const jogadorFound = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorFound)
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);

        return await jogadorFound.remove();
    }
}
