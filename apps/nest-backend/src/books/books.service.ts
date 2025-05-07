import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel('Book') private bookModel: Model<any>,
        @InjectModel('Counter') private counterModel: Model<any>
    ) {}
    
    async create(createBooksDTO: any) {
        // Increment counter for 'bookId'
        const counter = await this.counterModel.findOneAndUpdate(
            { id: 'bookId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } 
        );
    
        const newBook = new this.bookModel({
            ...createBooksDTO,
            bookId: counter.seq, 
        });
    
        return newBook.save();
    }
    

    async findAll() {
        try {
            return await this.bookModel.find().exec();
        } catch (err) {
            throw new InternalServerErrorException('Failed to fetch books');
        }
    }

    async findOne(bookId: number) {
        return this.bookModel.findOne({ bookId }).exec();
    }
    
    async update(bookId: number, updateBookDto: any) {
        return this.bookModel.findOneAndUpdate({ bookId }, updateBookDto, { new: true }).exec();
    }
    
    async delete(bookId: number) {
        return this.bookModel.findOneAndDelete({ bookId }).exec();
    }
    
}
