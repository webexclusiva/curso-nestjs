import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [JogadoresModule, CategoriesModule, MongooseModule.forRoot('mongodb://docker:docker@localhost:27017/cursonest?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')],
  controllers: [],
  providers: [],
})
export class AppModule {}
