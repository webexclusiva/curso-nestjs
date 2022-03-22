import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [JogadoresModule, MongooseModule.forRoot('mongodb://root:docker@127.0.0.1:27017/cursonest?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')],
  controllers: [],
  providers: [],
})
export class AppModule {}
