'use client';

import { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  const searchBooks = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/external-books/${query}`);
    setBooks(res.data.data || res.data);
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border-2 border-gray-300 rounded-l-lg px-4 py-2 text-lg focus:outline-none focus:border-blue-500 shadow-sm"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-r-lg shadow-md transition-colors"
          onClick={searchBooks}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </div>
  );
}
