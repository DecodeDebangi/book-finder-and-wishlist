import { useEffect, useState } from "react";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const fetchWishlist = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/books`);
    setWishlist(res.data); 
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wishlist.map((book, idx) => (
          <div key={idx} className="border rounded p-4 shadow">
            {book.coverUrl && (
              <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover mb-2" />
            )}
            <h2 className="font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Published: {book.first_publish_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
