import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
   phone: String,
   email: { type: String, unique: true },
   name: String,
   ranking: String,
   positionRanking: Number,
   urlImageJogador: String
}, {timestamps: true, collection: 'jogadores'});