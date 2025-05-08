import Link from 'next/link';

const Navbar = () => (
  <nav className="flex w-full justify-between items-center p-4 bg-gray-800 text-white">
    <Link href="/" className="text-xl font-bold">Book Finder</Link>
    <Link href="/wishlist" className="text-sm underline">Wishlist</Link>
  </nav>
);

export default Navbar;
