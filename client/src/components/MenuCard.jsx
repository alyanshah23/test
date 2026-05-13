import { Plus } from 'lucide-react';
import { formatMoney } from '../utils/money.js';

export const MenuCard = ({ item, onAdd }) => (
  <article className="group overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-xl shadow-orange-950/5">
    <div className="relative h-56 overflow-hidden">
      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-900">{item.category}</span>
    </div>
    <div className="space-y-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-black text-orange-950">{item.name}</h3>
        <p className="font-black text-orange-600">{formatMoney(item.price)}</p>
      </div>
      <p className="text-sm leading-6 text-stone-600">{item.description}</p>
      <button onClick={() => onAdd(item)} className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-950 px-5 py-3 font-bold text-white transition hover:bg-orange-700">
        <Plus size={18} /> Add to cart
      </button>
    </div>
  </article>
);
