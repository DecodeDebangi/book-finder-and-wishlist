import axios from "axios";

const BookCard = ({ book }: { book: any }) => {
  const addToWishlist = async () => {
    try {
      const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150';

      const first_publish_year = typeof book.first_publish_year === 'number'
        ? book.first_publish_year
        : (Array.isArray(book.publish_date) && book.publish_date.length > 0
            ? parseInt(book.publish_date[0], 10)
            : null);

      const payload = {
        title: book.title || 'Untitled',
        author: book.author || 'Unknown Author',
        coverUrl: book.coverUrl || 'https://via.placeholder.com/150',
        first_publish_year: first_publish_year ?? new Date().getFullYear(),
        pages: 100,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/books`, payload);
      alert('Book added to wishlist!');
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Failed to add book.');
    }
  };

  return (
    <div className="border rounded p-4 shadow">
      {book.coverUrl && (
        <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover mb-2" />
      )}
      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-sm text-gray-600">Author: {book.author}</p>
      <p className="text-sm text-gray-600">Published: {book.first_publish_year}</p>
      <button
        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
        onClick={addToWishlist}
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default BookCard;
