import { Schema } from 'mongoose';

export const BookSchema = new Schema({
    bookId: { type: Number, unique: true },
    title: String,
    author: String,
    coverUrl: String,
    first_publish_year: Number,
    pages: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

