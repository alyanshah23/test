import { ShoppingCart, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = ({ cartCount, onCartClick }) => (
  <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <a href="/#home" className="flex items-center gap-2 text-xl font-black text-orange-900">
        <span className="rounded-2xl bg-orange-600 p-2 text-white"><Utensils size={22} /></span>
        Biryani Bliss
      </a>
      <nav className="hidden items-center gap-7 text-sm font-semibold text-orange-950 md:flex">
        <a href="/#menu" className="hover:text-orange-600">Menu</a>
        <a href="/#checkout" className="hover:text-orange-600">Checkout</a>
        <Link to="/admin" className="hover:text-orange-600">Admin</Link>
      </nav>
      <button onClick={onCartClick} className="relative rounded-full bg-orange-900 px-4 py-3 text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-700" aria-label="Open cart">
        <ShoppingCart size={20} />
        {cartCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 px-2 text-xs font-bold text-orange-950">{cartCount}</span>}
      </button>
    </div>
  </header>
);
