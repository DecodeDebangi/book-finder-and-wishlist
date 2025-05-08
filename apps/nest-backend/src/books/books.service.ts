import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Marks this class as a service that can be injected into other components
@Injectable()
export class BooksService {
    // Constructor injects two Mongoose models: 'Book' and 'Counter'
    constructor(
        @InjectModel('Book') private bookModel: Model<any>,      // Inject the 'Book' model
        @InjectModel('Counter') private counterModel: Model<any> // Inject the 'Counter' model (for generating incremental IDs)
    ) {}

    // Method to create a new book document
    async create(createBooksDTO: any) {
        // Step 1: Find and increment the counter for 'bookId'
        const counter = await this.counterModel.findOneAndUpdate(
            { id: 'bookId' },                 // Filter: document where id = 'bookId'
            { $inc: { seq: 1 } },             // Update: increment the 'seq' field by 1
            { new: true, upsert: true }       // Options: return the updated document; create it if it doesn't exist
        );

        // Step 2: Create a new book instance with provided data and the incremented bookId
        const newBook = new this.bookModel({
            ...createBooksDTO,                // Spread all fields from the DTO into the new document
            bookId: counter.seq,              // Assign the incremented sequence as 'bookId'
        });

        // Step 3: Save the new book document to the database and return it
        return newBook.save();
    }

    // Method to fetch all books from the database
    async findAll() {
        try {
            // Attempt to find all books and return the result
            return await this.bookModel.find().exec();
        } catch (err) {
            // If an error occurs, throw a 500 Internal Server Error
            throw new InternalServerErrorException('Failed to fetch books');
        }
    }

    // Method to find a specific book by its bookId
    async findOne(bookId: number) {
        // Find a single book where bookId matches the parameter
        return this.bookModel.findOne({ bookId }).exec();
    }

    // Method to update an existing book by its bookId
    async update(bookId: number, updateBookDto: any) {
        // Find and update the book by bookId with new data, and return the updated document
        return this.bookModel.findOneAndUpdate({ bookId }, updateBookDto, { new: true }).exec();
    }

    // Method to delete a book by its bookId
    async delete(bookId: number) {
        // Find and delete the book where bookId matches
        return this.bookModel.findOneAndDelete({ bookId }).exec();
    }
}
