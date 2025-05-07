import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExternalBooksService } from './external-books.service';

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
