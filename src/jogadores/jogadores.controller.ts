import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateJogadorDto } from './dto/jogadores.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { UpdateJogadorDto } from './dto/update-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createJogador(@Body() createJogadorDto: CreateJogadorDto) : Promise<Jogador>{
        return await this.jogadoresService.createJogador(createJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string, 
        @Body() updateJogadorDto: UpdateJogadorDto) : Promise<void>{
        await this.jogadoresService.updateJogador(_id, updateJogadorDto);
    } 

    @Get()
    async getAllJogadores(): Promise<Jogador | Jogador[]>{
            return await this.jogadoresService.getAllJogadores();      
    }


    @Get('/:_id')
    async getJogadorById(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string) : Promise<Jogador>{
           return await this.jogadoresService.getJogadorById(_id);
    }

    @Delete('/:_id')
    async deleteJogador(@Param('_id', JogadoresValidacaoParametrosPipe ) _id: string): Promise<void>{
        return await this.jogadoresService.deleteJogador(_id);
    }

}
