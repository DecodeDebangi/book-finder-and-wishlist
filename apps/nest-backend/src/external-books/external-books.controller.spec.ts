import { Test, TestingModule } from '@nestjs/testing';
import { ExternalBooksController } from './external-books.controller';

describe('ExternalBooksController', () => {
  let controller: ExternalBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalBooksController],
    }).compile();

    controller = module.get<ExternalBooksController>(ExternalBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
