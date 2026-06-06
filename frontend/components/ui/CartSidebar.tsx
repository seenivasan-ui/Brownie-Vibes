'use client'
import { useCartStore } from '@/lib/store'
import { X, Minus, Plus, Trash2 } from 'lucide-react'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, updateQty, removeItem, total, count } = useCartStore()
  const orderViaWhatsApp = () => {
    if (!items.length) return
    const t = total()
    let msg = `Hello Brownie Vibes! 🍫\n\nOrder:\n\n`
    items.forEach(i => msg += `• ${i.name} × ${i.qty} = ₹${i.price*i.qty}\n`)
    msg += `\n*Total: ₹${t}*\nDelivery: Tamil Nadu\nPlease confirm! 🙏`
    window.open(`https://wa.me/919842916379?text=${encodeURIComponent(msg)}`, '_blank')
  }
  return (
    <>
      <div onClick={toggleCart} className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] transition-opacity ${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`} />
      <div className={`fixed top-0 right-0 h-screen w-[420px] max-w-full bg-white z-[2001] flex flex-col shadow-2xl transition-transform duration-500 ${isOpen?'translate-x-0':'translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-5 border-b border-caramel/10">
          <h2 className="font-cormorant text-2xl font-bold text-brown-800">Your Cart 🛒</h2>
          <button onClick={toggleCart} className="w-9 h-9 rounded-full border border-caramel/20 flex items-center justify-center text-brown-600 hover:bg-cream transition-colors"><X size={16}/></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!items.length ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-brown-600/40"><span className="text-6xl">🍫</span><p className="text-center">Cart is empty.<br/>Add something delicious!</p></div>
          ) : items.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-caramel/07 last:border-0">
              <span className="text-3xl w-12 text-center">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-brown-800 text-[.9rem] truncate">{item.name}</div>
                <div className="text-caramel font-semibold text-sm">₹{item.price} × {item.qty} = ₹{item.price*item.qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>updateQty(item.id,-1)} className="w-7 h-7 rounded-full border border-caramel/20 flex items-center justify-center text-brown-600 hover:bg-brown-700 hover:text-white hover:border-brown-700 transition-all"><Minus size={11}/></button>
                <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                <button onClick={()=>updateQty(item.id,1)} className="w-7 h-7 rounded-full border border-caramel/20 flex items-center justify-center text-brown-600 hover:bg-brown-700 hover:text-white hover:border-brown-700 transition-all"><Plus size={11}/></button>
                <button onClick={()=>removeItem(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-pink hover:bg-pink-light transition-colors ml-1"><Trash2 size={12}/></button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-5 border-t border-caramel/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-brown-600 font-semibold">{count()} item{count()!==1?'s':''}</span>
            <span className="font-cormorant text-3xl font-bold text-caramel">₹{total()}</span>
          </div>
          <button onClick={orderViaWhatsApp} disabled={!items.length}
            className="w-full bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-40 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(37,211,102,.4)]">
            💬 Order via WhatsApp
          </button>
        </div>
      </div>
    </>
  )
}
