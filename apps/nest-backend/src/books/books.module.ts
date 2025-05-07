import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }, { name: 'Counter', schema: CounterSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
