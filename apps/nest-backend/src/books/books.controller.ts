import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDTO } from './dto/create-book-dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    async create(@Body() createBook: CreateBooksDTO) {
        return this.booksService.create(createBook);
    }

    @Get()
    async findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
    const bookId = parseInt(id, 10);
    const book = await this.booksService.findOne(bookId);
    if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return book;
}


@Put(':id')
async update(@Param('id') id: string, @Body() updateBookDto: CreateBooksDTO) {
const bookId = parseInt(id, 10);
const updatedBook = await this.booksService.update(bookId, updateBookDto);
if (!updatedBook) {
throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
}
return updatedBook;
}

@Delete(':id')
async delete(@Param('id') id: string) {
const bookId = parseInt(id, 10);
const deletedBook = await this.booksService.delete(bookId);
if (!deletedBook) {
throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
}
return deletedBook;
}

}