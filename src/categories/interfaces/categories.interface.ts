import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Category extends Document{
    readonly category: string;
    description: string;
    events: Array<Event>;
    jogadores: Array<Jogador>
}

export interface Event{
    name: string;
    operation: string;
    value: number;
}