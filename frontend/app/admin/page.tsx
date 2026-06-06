'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuthStore, MenuItem } from '@/lib/store'
import { menuAPI, authAPI, DEFAULT_MENU } from '@/lib/api'
import { Plus, Trash2, Save, LogOut, Eye, EyeOff, Package, TrendingUp } from 'lucide-react'

export default function AdminPage() {
  const { isOwner, login, logout } = useAuthStore()
  const [u, setU] = useState(''); const [p, setP] = useState('')
  const [showP, setShowP] = useState(false); const [err, setErr] = useState('')
  const [items, setItems] = useState<MenuItem[]>(DEFAULT_MENU as MenuItem[])
  const [newItem, setNewItem] = useState({name:'',price:'',description:'',category:'brownies',emoji:'🍫',badge:'',image:''})

  useEffect(() => {
    if (isOwner) {
      menuAPI.getAll().then(r=>setItems(r.data)).catch(()=>setItems(DEFAULT_MENU as MenuItem[]))
    }
  }, [isOwner])

  const handleLogin = async () => {
    try {
      const res = await authAPI.login(u, p)
      login(res.data.access_token)
      toast.success('Welcome back, Monisha! 👋'); setErr('')
    } catch {
      // fallback local check
      if (u==='monisha' && p==='brownievibes@2025') {
        login('local-token'); toast.success('Welcome back, Monisha! 👋'); setErr('')
      } else { setErr('Incorrect credentials. Try again.') }
    }
  }

  const save = async (item: MenuItem) => {
    try { await menuAPI.update(item.id, item) } catch {}
    setItems(prev => prev.map(i => i.id===item.id?item:i))
    toast.success(`✓ "${item.name}" updated!`)
  }

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    try { await menuAPI.delete(id) } catch {}
    setItems(prev => prev.filter(i => i.id!==id))
    toast.success(`🗑️ "${name}" deleted`)
  }

  const add = async () => {
    if (!newItem.name || !newItem.price) { toast.error('Name & price required!'); return }
    const item: MenuItem = { id: Date.now().toString(), name:newItem.name, price:+newItem.price, description:newItem.description||'Delicious homemade treat.', category:newItem.category, emoji:newItem.emoji||'🍰', badge:newItem.badge, image:newItem.image, tags:[], available:true }
    try { await menuAPI.create(item) } catch {}
    setItems(prev => [...prev, item])
    setNewItem({name:'',price:'',description:'',category:'brownies',emoji:'🍫',badge:'',image:''})
    toast.success(`✓ "${item.name}" added!`)
  }

  // ── LOGIN SCREEN ──────────────────────────────────────────
  if (!isOwner) return (
    <div className="min-h-screen pt-[72px] bg-cream flex items-center justify-center px-4">
      <motion.div initial={{opacity:0,scale:.9,y:30}} animate={{opacity:1,scale:1,y:0}} transition={{type:'spring',stiffness:280,damping:24}}
        className="bg-white rounded-3xl p-10 w-full max-w-md shadow-[0_20px_60px_rgba(44,21,7,.15)]">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-caramel/20 relative">
            <Image src="/images/logo.jpg" alt="Brownie Vibes" fill className="object-cover"/>
          </div>
        </div>
        <h1 className="font-cormorant text-3xl font-bold text-brown-800 text-center mb-1">Owner Login</h1>
        <p className="text-brown-600/60 text-sm text-center mb-7">Brownie Vibes Dashboard</p>
        {err && <p className="text-pink text-sm mb-3 text-center">❌ {err}</p>}
        <div className="mb-4">
          <label className="block text-[.68rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-1.5">Username</label>
          <input type="text" value={u} onChange={e=>setU(e.target.value)} placeholder="monisha" autoComplete="off"
            className="w-full px-4 py-3 border-[1.5px] border-caramel/20 rounded-xl bg-cream text-brown-800 outline-none focus:border-caramel focus:shadow-[0_0_0_3px_rgba(193,127,36,.1)] transition-all"/>
        </div>
        <div className="mb-6 relative">
          <label className="block text-[.68rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-1.5">Password</label>
          <input type={showP?'text':'password'} value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••"
            className="w-full px-4 py-3 pr-12 border-[1.5px] border-caramel/20 rounded-xl bg-cream text-brown-800 outline-none focus:border-caramel focus:shadow-[0_0_0_3px_rgba(193,127,36,.1)] transition-all"/>
          <button type="button" onClick={()=>setShowP(!showP)} className="absolute right-3 top-[2.2rem] text-brown-600/50 hover:text-brown-600 transition-colors">
            {showP ? <EyeOff size={17}/> : <Eye size={17}/>}
          </button>
        </div>
        <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}} onClick={handleLogin}
          className="w-full bg-brown-700 hover:bg-caramel text-white font-bold py-4 rounded-2xl transition-colors shimmer">
          Login to Dashboard
        </motion.button>
        <p className="text-brown-600/35 text-xs text-center mt-4">Default: monisha / brownievibes@2025</p>
      </motion.div>
    </div>
  )

  // ── DASHBOARD ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f4ef]">
      {/* Dashboard Nav */}
      <div className="bg-brown-900 px-[3%] h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/images/monisha.jpg" alt="Monisha" fill className="object-cover object-top"/>
          </div>
          <span className="font-dancing text-xl text-cream">Brownie <span className="text-caramel">Vibes</span> · Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/45 text-sm hidden sm:block">Welcome, Monisha 👋</span>
          <button onClick={()=>{logout();toast.success('Logged out!')}}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm transition-all">
            <LogOut size={13}/> Logout
          </button>
        </div>
      </div>

      <div className="px-[3%] py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[{label:'Total Items',val:items.length,icon:<Package size={18}/>},{label:'Avg Price',val:'₹'+Math.round(items.reduce((s,i)=>s+i.price,0)/items.length||0),icon:<TrendingUp size={18}/>},{label:'Available',val:items.filter(i=>i.available).length,icon:'✓'},{label:'Out of Stock',val:items.filter(i=>!i.available).length,icon:'✗'}].map(s=>(
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-brown-600/60 text-[.72rem] font-semibold uppercase tracking-wide mb-1">{s.label}</div>
              <div className="font-cormorant text-3xl font-bold text-caramel">{s.val}</div>
            </div>
          ))}
        </div>

        {/* Add new item */}
        <div className="bg-white rounded-3xl p-7 mb-8 border-2 border-dashed border-caramel/30 shadow-sm">
          <h2 className="font-cormorant text-2xl font-bold text-brown-800 mb-5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-caramel/10 flex items-center justify-center text-caramel"><Plus size={18}/></span>
            Add New Menu Item
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" placeholder="Item name *" value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})}/>
            <input type="number" className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-caramel font-bold bg-cream outline-none focus:border-caramel transition-all" placeholder="Price in ₹ *" value={newItem.price} onChange={e=>setNewItem({...newItem,price:e.target.value})}/>
            <input className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" placeholder="Emoji (🍫)" value={newItem.emoji} onChange={e=>setNewItem({...newItem,emoji:e.target.value})}/>
            <input className="sm:col-span-2 lg:col-span-3 border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" placeholder="Short description" value={newItem.description} onChange={e=>setNewItem({...newItem,description:e.target.value})}/>
            <select className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" value={newItem.category} onChange={e=>setNewItem({...newItem,category:e.target.value})}>
              {['brownies','cakes','cream','drip','custom','cookies','donuts','savory'].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
            </select>
            <select className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" value={newItem.badge} onChange={e=>setNewItem({...newItem,badge:e.target.value})}>
              <option value="">No Badge</option>
              <option value="bestseller">⭐ Bestseller</option>
              <option value="new">🆕 New</option>
              <option value="trending">🔥 Trending</option>
              <option value="custom">✨ Custom</option>
            </select>
            <input className="border-[1.5px] border-caramel/20 rounded-xl px-4 py-3 text-brown-800 bg-cream outline-none focus:border-caramel transition-all" placeholder="Image URL (optional)" value={newItem.image} onChange={e=>setNewItem({...newItem,image:e.target.value})}/>
          </div>
          <motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}} onClick={add}
            className="mt-5 bg-caramel hover:bg-brown-700 text-white font-bold px-8 py-3.5 rounded-full flex items-center gap-2 transition-colors shimmer">
            <Plus size={17}/> Add to Menu
          </motion.button>
        </div>

        {/* Manage items */}
        <h2 className="font-cormorant text-2xl font-bold text-brown-800 mb-5">
          📋 Manage Items <span className="text-lg font-normal text-brown-600/50">({items.length} total)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {items.map(item => <EditCard key={item.id} item={item} onSave={save} onDelete={del}/>)}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function EditCard({item,onSave,onDelete}:{item:MenuItem,onSave:(i:MenuItem)=>void,onDelete:(id:string,name:string)=>void}) {
  const [draft, setDraft] = useState(item)
  const dirty = JSON.stringify(draft) !== JSON.stringify(item)
  return (
    <motion.div layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.9}}
      className={`bg-white rounded-2xl p-5 shadow-sm border-[1.5px] transition-all ${dirty?'border-caramel/50':'border-transparent hover:border-caramel/20'}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{draft.emoji}</span>
        <div className="min-w-0">
          <div className="font-cormorant text-[1rem] font-bold text-brown-800 truncate">{draft.name}</div>
          <div className="text-[.68rem] text-brown-600/60 uppercase tracking-wide">{draft.category}</div>
        </div>
      </div>
      <label className="block text-[.68rem] font-bold tracking-[.08em] uppercase text-brown-600/55 mb-1">Price (₹)</label>
      <input type="number" value={draft.price} onChange={e=>setDraft({...draft,price:+e.target.value})}
        className="w-full border-[1.5px] border-caramel/20 rounded-xl px-4 py-2.5 text-caramel font-bold text-lg bg-cream outline-none focus:border-caramel mb-3 transition-all"/>
      <label className="block text-[.68rem] font-bold tracking-[.08em] uppercase text-brown-600/55 mb-1">Available</label>
      <div className="flex items-center gap-2 mb-3">
        <div onClick={()=>setDraft({...draft,available:!draft.available})}
          className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${draft.available?'bg-green-400':'bg-gray-300'}`}>
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${draft.available?'translate-x-5':'translate-x-0.5'}`}/>
        </div>
        <span className="text-[.78rem] text-brown-600">{draft.available?'In Stock':'Out of Stock'}</span>
      </div>
      <div className="flex gap-2">
        <motion.button whileHover={{scale:1.03}} whileTap={{scale:.96}} onClick={()=>onSave(draft)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${dirty?'bg-caramel text-white':'bg-brown-700 text-white hover:bg-caramel'}`}>
          <Save size={13}/> Save
        </motion.button>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={()=>onDelete(item.id,item.name)}
          className="px-3.5 py-2.5 rounded-xl bg-pink/10 text-pink border border-pink/20 hover:bg-pink hover:text-white transition-all">
          <Trash2 size={14}/>
        </motion.button>
      </div>
    </motion.div>
  )
}
