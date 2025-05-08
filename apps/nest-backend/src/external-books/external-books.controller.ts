import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExternalBooksService } from './external-books.service';

// Marks this class as a controller for the '/external-books' route
@Controller('external-books')
export class ExternalBooksController {
  constructor(private externalBooksService: ExternalBooksService) {}

  @Get(':title')
  async getBooks(
    @Param('title') title: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.externalBooksService.searchBooks(title, Number(page), Number(limit));
  }
}
