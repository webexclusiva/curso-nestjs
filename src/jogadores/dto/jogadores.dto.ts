import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateJogadorDto{

    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly phone: string;
}