import { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  const searchBooks = async () => {
    console.log("Button clicked. Search function called.");

    // const res = await axios.get(`${process.env.VITE_BACKEND_API_BASE_URL}/external-books/${query}`);
    // const res = await axios.get(`http://localhost:3001/external-books/${query}?page=2&limit=5`);
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/external-books/${query}?page=2&limit=5`);
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
};

export default SearchPage;
