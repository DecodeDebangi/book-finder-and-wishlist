import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="flex w-full justify-between items-center p-4 bg-gray-800 text-white">
    <Link to="/" className="text-xl font-bold">Book Finder</Link>
    <Link to="/wishlist" className="text-sm underline">Wishlist</Link>
  </nav>
);

export default Navbar;
