import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateJogadorDto } from './dto/jogadores.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createJogador(@Body() createJogadorDto: CreateJogadorDto){
        await this.jogadoresService.createJogador(createJogadorDto);
    }

    @Put('/:_id')
    async updateJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string, 
        @Body() createJogadorDto: CreateJogadorDto) : Promise<void>{
        await this.jogadoresService.updateJogador(_id, createJogadorDto);
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
