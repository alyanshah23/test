import { Clock, Search, ShieldCheck, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api/client.js';
import { CartDrawer } from '../components/CartDrawer.jsx';
import { Header } from '../components/Header.jsx';
import { MenuCard } from '../components/MenuCard.jsx';
import { formatMoney } from '../utils/money.js';

export const HomePage = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [form, setForm] = useState({ customer_name: '', phone: '', address: '', notes: '' });

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setMenu(await api.getMenu({ search, category }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(loadMenu, 250);
    return () => clearTimeout(timeout);
  }, [search, category]);

  const categories = useMemo(() => [...new Set(menu.map((item) => item.category).filter(Boolean))], [menu]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const addToCart = (item) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) return current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      return [...current, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return setCart((current) => current.filter((item) => item.id !== id));
    return setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (cart.length === 0) return toast.error('Add at least one biryani before checkout.');

    try {
      const order = await api.createOrder({
        ...form,
        items: cart.map(({ id, name, price, quantity, image_url }) => ({ id, name, price, quantity, image_url })),
        total_price: total,
      });
      setConfirmation(order);
      setCart([]);
      setForm({ customer_name: '', phone: '', address: '', notes: '' });
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8ed]">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} items={cart} total={total} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} onRemove={(id) => updateQuantity(id, 0)} />

      <main>
        <section id="home" className="hero-pattern overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-900"><Star size={16} /> Handcrafted dum biryani</span>
              <h1 className="text-5xl font-black leading-tight text-orange-950 md:text-7xl">Fresh, royal biryani delivered hot.</h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700">Order layered rice, slow-cooked meats, vegetarian favorites, raita, and salan from one smooth single-page experience.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#menu" className="rounded-full bg-orange-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-orange-700/25 hover:bg-orange-700">Explore menu</a>
                <button onClick={() => setCartOpen(true)} className="rounded-full border border-orange-200 bg-white px-7 py-4 font-black text-orange-950 hover:border-orange-500">View cart</button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[['35 min', 'Average delivery'], ['4.9/5', 'Guest rating'], ['100%', 'Halal kitchen']].map(([value, label]) => <div key={label} className="rounded-3xl bg-white/80 p-4"><p className="text-2xl font-black text-orange-950">{value}</p><p className="text-sm text-stone-600">{label}</p></div>)}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=1100&q=80" alt="Biryani bowl" className="rounded-[3rem] shadow-2xl shadow-orange-950/20" />
              <div className="absolute -bottom-8 left-6 rounded-3xl bg-white p-5 shadow-xl"><p className="flex items-center gap-2 font-black text-orange-950"><Clock className="text-orange-600" /> Live kitchen</p><p className="text-sm text-stone-600">Orders move from pending to preparing to delivered.</p></div>
            </div>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div><p className="font-black uppercase tracking-[0.3em] text-orange-600">Our menu</p><h2 className="mt-2 text-4xl font-black text-orange-950">Pick your biryani</h2></div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="relative"><Search className="absolute left-4 top-3.5 text-orange-500" size={19} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search menu" className="w-full rounded-full border border-orange-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-orange-500" /></label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-orange-200 bg-white px-5 py-3 outline-none focus:border-orange-500"><option value="">All categories</option>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select>
            </div>
          </div>
          {loading ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="h-96 animate-pulse rounded-[2rem] bg-orange-100" />)}</div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{menu.map((item) => <MenuCard key={item.id} item={item} onAdd={addToCart} />)}</div>}
        </section>

        <section id="checkout" className="bg-orange-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5"><ShieldCheck className="text-amber-300" size={44} /><h2 className="text-4xl font-black">Secure checkout</h2><p className="text-orange-100">Your order is saved to PostgreSQL for the admin kitchen dashboard.</p>{confirmation && <div className="rounded-3xl bg-white/10 p-5"><p className="font-black text-amber-200">Order confirmed!</p><p className="text-sm text-orange-50">Order #{confirmation.id.slice(0, 8)} is currently {confirmation.status}.</p></div>}</div>
            <form onSubmit={placeOrder} className="rounded-[2rem] bg-white p-6 text-orange-950 shadow-2xl">
              <div className="mb-5 rounded-3xl bg-orange-50 p-4"><div className="flex justify-between font-black"><span>{cartCount} item(s)</span><span>{formatMoney(total)}</span></div></div>
              <div className="grid gap-4 sm:grid-cols-2"><input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} placeholder="Name" className="rounded-2xl border border-orange-200 px-4 py-3" /><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="rounded-2xl border border-orange-200 px-4 py-3" /></div>
              <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Delivery address" className="mt-4 min-h-28 w-full rounded-2xl border border-orange-200 px-4 py-3" />
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Order notes" className="mt-4 min-h-24 w-full rounded-2xl border border-orange-200 px-4 py-3" />
              <button className="mt-4 w-full rounded-full bg-orange-600 px-6 py-4 font-black text-white hover:bg-orange-700">Place order</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};
