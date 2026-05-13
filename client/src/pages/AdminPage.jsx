import { LogOut, Plus, RefreshCcw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { formatMoney } from '../utils/money.js';

const emptyItem = { name: '', description: '', price: '', image_url: '', category: 'Biryani' };

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(credentials);
      toast.success('Welcome back, admin.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-orange-950 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <p className="font-black uppercase tracking-[0.3em] text-orange-600">Admin</p>
        <h1 className="mt-2 text-3xl font-black text-orange-950">Kitchen login</h1>
        <input required type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} placeholder="Email" className="mt-8 w-full rounded-2xl border border-orange-200 px-4 py-3" />
        <input required type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} placeholder="Password" className="mt-4 w-full rounded-2xl border border-orange-200 px-4 py-3" />
        <button disabled={loading} className="mt-6 w-full rounded-full bg-orange-600 px-5 py-3 font-black text-white disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [item, setItem] = useState(emptyItem);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const [ordersData, menuData] = await Promise.all([api.getOrders(), api.getMenu()]);
      setOrders(ordersData);
      setMenu(menuData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAuthenticated) load(); }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  const analytics = useMemo(() => ({
    totalOrders: orders.length,
    revenue: orders.reduce((sum, order) => sum + order.total_price, 0),
    preparing: orders.filter((order) => order.status === 'preparing').length,
  }), [orders]);

  const saveMenuItem = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.updateMenuItem(editingId, { ...item, price: Number(item.price) });
        toast.success('Menu item updated.');
      } else {
        await api.createMenuItem({ ...item, price: Number(item.price) });
        toast.success('Menu item added.');
      }
      setItem(emptyItem);
      setEditingId(null);
      load();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const edit = (menuItem) => {
    setEditingId(menuItem.id);
    setItem({ name: menuItem.name, description: menuItem.description, price: menuItem.price, image_url: menuItem.image_url, category: menuItem.category });
  };

  const remove = async (id) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      await api.deleteMenuItem(id);
      toast.success('Menu item deleted.');
      load();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const updated = await api.updateOrderStatus(id, status);
      setOrders((current) => current.map((order) => order.id === id ? updated : order));
      toast.success('Order status updated.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8ed] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] bg-orange-950 p-6 text-white md:flex-row md:items-center">
          <div><p className="font-black uppercase tracking-[0.3em] text-amber-300">Dashboard</p><h1 className="text-3xl font-black">Biryani Bliss Admin</h1></div>
          <div className="flex gap-3"><button onClick={load} className="rounded-full bg-white/10 px-4 py-3 font-bold"><RefreshCcw size={18} /></button><button onClick={logout} className="flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-bold"><LogOut size={18} /> Logout</button></div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow"><p className="text-sm font-bold text-stone-500">Total orders</p><p className="text-3xl font-black text-orange-950">{analytics.totalOrders}</p></div>
          <div className="rounded-3xl bg-white p-6 shadow"><p className="text-sm font-bold text-stone-500">Revenue</p><p className="text-3xl font-black text-orange-950">{formatMoney(analytics.revenue)}</p></div>
          <div className="rounded-3xl bg-white p-6 shadow"><p className="text-sm font-bold text-stone-500">Preparing</p><p className="text-3xl font-black text-orange-950">{analytics.preparing}</p></div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-orange-950">Orders</h2>
            {loading ? <p className="mt-5">Loading dashboard...</p> : <div className="mt-5 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-3xl border border-orange-100 p-4"><div className="flex flex-col justify-between gap-3 lg:flex-row"><div><p className="font-black text-orange-950">{order.customer_name} · {formatMoney(order.total_price)}</p><p className="text-sm text-stone-600">{order.phone} · {order.address}</p><p className="text-sm text-stone-500">{order.items.map((orderItem) => `${orderItem.quantity}× ${orderItem.name}`).join(', ')}</p></div><select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="rounded-full border border-orange-200 px-4 py-2"><option value="pending">pending</option><option value="preparing">preparing</option><option value="delivered">delivered</option></select></div></article>)}</div>}
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-orange-950">Menu management</h2>
            <form onSubmit={saveMenuItem} className="mt-5 space-y-3"><input required value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} placeholder="Name" className="w-full rounded-2xl border border-orange-200 px-4 py-3" /><input required type="number" step="0.01" min="0.01" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} placeholder="Price" className="w-full rounded-2xl border border-orange-200 px-4 py-3" /><input required value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })} placeholder="Category" className="w-full rounded-2xl border border-orange-200 px-4 py-3" /><input required value={item.image_url} onChange={(e) => setItem({ ...item, image_url: e.target.value })} placeholder="Image URL" className="w-full rounded-2xl border border-orange-200 px-4 py-3" /><textarea required value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} placeholder="Description" className="min-h-24 w-full rounded-2xl border border-orange-200 px-4 py-3" /><button className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-black text-white"><Plus size={18} /> {editingId ? 'Update item' : 'Add item'}</button></form>
            <div className="mt-6 space-y-3">{menu.map((menuItem) => <div key={menuItem.id} className="flex items-center justify-between gap-3 rounded-2xl bg-orange-50 p-3"><button onClick={() => edit(menuItem)} className="text-left"><p className="font-black text-orange-950">{menuItem.name}</p><p className="text-sm text-orange-700">{formatMoney(menuItem.price)}</p></button><button onClick={() => remove(menuItem.id)} className="text-red-500"><Trash2 size={18} /></button></div>)}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const AdminPage = ({ dashboard = false }) => dashboard ? <Dashboard /> : <Login />;
