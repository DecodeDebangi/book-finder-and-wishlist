import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';

interface OpenLibraryBook {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  }
  

@Injectable()
export class ExternalBooksService {
  constructor(private httpService: HttpService) {}

  async searchBooks(title: string, page = 1, limit = 10) {
    const apiPageSize = 100; 
    const apiPage = Math.floor(((page - 1) * limit) / apiPageSize) + 1;
  
    const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&page=${apiPage}`;
  
    try {
      const response = await firstValueFrom(
        this.httpService.get(apiUrl).pipe(
          map(res => res.data),
          catchError(err => throwError(() => new Error('Error fetching from external API')))
        )
      );
  
      const allDocs = response.docs as OpenLibraryBook[];
  
      const startIdx = ((page - 1) * limit) % apiPageSize;
      const endIdx = startIdx + limit;
  
      const paginatedDocs = allDocs.slice(startIdx, endIdx);
  
      const books = paginatedDocs.map(book => ({
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        first_publish_year: book.first_publish_year || 'Unknown',
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null
      }));
  
      return {
        data: books,
        page,
        limit,
        total: response.numFound
      };
    } catch (error) {
      throw new Error('Failed to fetch external book data');
    }
  }
}
