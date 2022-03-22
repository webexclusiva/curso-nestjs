import { IsNotEmpty } from 'class-validator'

export class UpdateJogadorDto{

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phone: string;
}