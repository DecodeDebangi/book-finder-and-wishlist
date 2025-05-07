import { Test, TestingModule } from '@nestjs/testing';
import { ExternalBooksService } from './external-books.service';

describe('ExternalBooksService', () => {
  let service: ExternalBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalBooksService],
    }).compile();

    service = module.get<ExternalBooksService>(ExternalBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
