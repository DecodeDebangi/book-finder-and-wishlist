import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { BooksController } from './books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalBooksModule } from './external-books/external-books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log('MONGODB_URI:', process.env.MONGODB_URI);


@Module({
  imports: [ BooksModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes config available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ExternalBooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware)
    // .forRoutes({
    //   path:'songs', method: RequestMethod.POST
    // });
    consumer.apply(LoggerMiddleware)
    .forRoutes(BooksController);
  }
}
