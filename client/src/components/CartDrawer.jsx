import { Minus, Plus, Trash2, X } from 'lucide-react';
import { formatMoney } from '../utils/money.js';

export const CartDrawer = ({ isOpen, items, total, onClose, onQuantity, onRemove }) => (
  <div className={`fixed inset-0 z-40 ${isOpen ? '' : 'pointer-events-none'}`}>
    <div className={`absolute inset-0 bg-black/40 transition ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
    <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-orange-950">Your cart</h2>
        <button onClick={onClose} className="rounded-full bg-orange-50 p-2 text-orange-900"><X /></button>
      </div>
      <div className="mt-6 space-y-4 overflow-y-auto pb-32">
        {items.length === 0 ? (
          <p className="rounded-3xl bg-orange-50 p-6 text-center text-orange-900">Your cart is waiting for biryani.</p>
        ) : items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-3xl border border-orange-100 p-3">
            <img src={item.image_url} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <div className="flex justify-between gap-2">
                <h3 className="font-bold text-orange-950">{item.name}</h3>
                <button onClick={() => onRemove(item.id)} className="text-red-500"><Trash2 size={18} /></button>
              </div>
              <p className="text-sm font-semibold text-orange-700">{formatMoney(item.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => onQuantity(item.id, item.quantity - 1)} className="rounded-full bg-orange-100 p-1"><Minus size={16} /></button>
                <span className="font-bold">{item.quantity}</span>
                <button onClick={() => onQuantity(item.id, item.quantity + 1)} className="rounded-full bg-orange-100 p-1"><Plus size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-orange-100 bg-white p-6">
        <div className="mb-4 flex justify-between text-xl font-black text-orange-950"><span>Total</span><span>{formatMoney(total)}</span></div>
        <a href="/#checkout" onClick={onClose} className="block rounded-full bg-orange-600 px-5 py-3 text-center font-bold text-white hover:bg-orange-700">Go to checkout</a>
      </div>
    </aside>
  </div>
);
