'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuCard from '@/components/menu/MenuCard'
import { DEFAULT_MENU, menuAPI } from '@/lib/api'
import { MenuItem } from '@/lib/store'

const CATS = [{k:'all',l:'✨ All Items'},{k:'brownies',l:'🍫 Brownies'},{k:'cakes',l:'🎂 Birthday Cakes'},{k:'cream',l:'🍦 Cream Cakes'},{k:'drip',l:'💧 Drip Cakes'},{k:'custom',l:'🎨 Custom'},{k:'cookies',l:'🍪 Cookies'},{k:'donuts',l:'🍩 Donuts'},{k:'savory',l:'🍕 Savory'}]
const STYLES = ['🍫 Drip Cake','🍦 Cream Overflow','💎 Fondant','🌸 Floral','🎨 Themed','🖼️ Photo Print','✨ Glitter']
const FLAVOURS = ['Chocolate','Red Velvet','Butterscotch','Vanilla','Pineapple','Black Forest']
const OCCASIONS = ['🎂 Birthday','💑 Anniversary','👰 Wedding','🍼 Baby Shower','🎓 Graduation','🎉 Party']

export default function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>(DEFAULT_MENU as MenuItem[])
  const [cat, setCat]     = useState('all')
  const [maxP, setMaxP]   = useState(2000)
  const [sort, setSort]   = useState('default')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selStyles, setSelStyles]   = useState<string[]>([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    menuAPI.getAll().then(r=>setItems(r.data)).catch(()=>setItems(DEFAULT_MENU as MenuItem[])).finally(()=>setLoading(false))
  }, [])

  const filtered = (() => {
    let d = items.filter(i => (cat==='all'||i.category===cat) && i.price<=maxP)
    if (sort==='low')  d = [...d].sort((a,b)=>a.price-b.price)
    if (sort==='high') d = [...d].sort((a,b)=>b.price-a.price)
    if (sort==='pop')  d = [...d].sort((a,b)=>(b.badge?1:0)-(a.badge?1:0))
    return d
  })()

  const toggleStyle = (s: string) => setSelStyles(prev => prev.includes(s)?prev.filter(x=>x!==s):[...prev,s])

  return (
    <section id="menu" className="pb-20">
      {/* Quick cat chips */}
      <div className="px-[5%] pt-7 pb-2">
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATS.map(c => (
            <button key={c.k} onClick={()=>setCat(c.k)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[.83rem] font-medium border-[1.5px] transition-all duration-300 whitespace-nowrap ${cat===c.k?'bg-brown-700 border-brown-700 text-white':' border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel hover:bg-cream'}`}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-[5%] py-4">
        <button onClick={()=>setFilterOpen(!filterOpen)} className="flex items-center gap-2 bg-white border-[1.5px] border-caramel/25 text-brown-700 px-5 py-2.5 rounded-full text-[.875rem] font-medium hover:border-caramel hover:text-caramel transition-all mb-4">
          ⚙️ Filter & Sort {selStyles.length>0&&<span className="bg-caramel text-white rounded-full px-2 py-0.5 text-[.68rem] font-bold">{selStyles.length}</span>}
        </button>

        <AnimatePresence>
          {filterOpen && (
            <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              className="bg-white rounded-2xl p-6 border border-caramel/10 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-[.7rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-2">Price Range</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={10} max={2000} step={10} value={maxP} onChange={e=>setMaxP(+e.target.value)} className="flex-1 accent-caramel"/>
                    <span className="text-caramel font-bold text-[.85rem] min-w-[60px]">₹{maxP}</span>
                  </div>
                </div>
                {/* Cake Style */}
                <div>
                  <label className="block text-[.7rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-2">Cake Style</label>
                  <div className="flex flex-wrap gap-1.5">
                    {STYLES.map(s=><button key={s} onClick={()=>toggleStyle(s)} className={`px-3 py-1.5 rounded-full text-[.75rem] font-medium border-[1.5px] transition-all ${selStyles.includes(s)?'bg-caramel border-caramel text-white':'border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel'}`}>{s}</button>)}
                  </div>
                </div>
                {/* Flavour */}
                <div>
                  <label className="block text-[.7rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-2">Flavour</label>
                  <div className="flex flex-wrap gap-1.5">
                    {FLAVOURS.map(f=><button key={f} className="px-3 py-1.5 rounded-full text-[.75rem] font-medium border-[1.5px] border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel transition-all">{f}</button>)}
                  </div>
                </div>
                {/* Occasion */}
                <div>
                  <label className="block text-[.7rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-2">Occasion</label>
                  <div className="flex flex-wrap gap-1.5">
                    {OCCASIONS.map(o=><button key={o} className="px-3 py-1.5 rounded-full text-[.75rem] font-medium border-[1.5px] border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel transition-all">{o}</button>)}
                  </div>
                </div>
                {/* Sort */}
                <div>
                  <label className="block text-[.7rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-2">Sort By</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[['default','Recommended'],['low','Price: Low→High'],['high','Price: High→Low'],['pop','Most Popular']].map(([v,l])=>(
                      <button key={v} onClick={()=>setSort(v)} className={`px-3 py-1.5 rounded-full text-[.75rem] font-medium border-[1.5px] transition-all ${sort===v?'bg-caramel border-caramel text-white':'border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel'}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5 pt-4 border-t border-caramel/08">
                <button onClick={()=>setFilterOpen(false)} className="bg-brown-700 hover:bg-caramel text-white px-6 py-2.5 rounded-full text-[.875rem] font-semibold transition-colors">Apply</button>
                <button onClick={()=>{setCat('all');setMaxP(2000);setSort('default');setSelStyles([])}} className="border border-caramel/20 text-brown-600 hover:border-caramel hover:text-caramel px-5 py-2.5 rounded-full text-[.875rem] transition-all">Reset</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[.82rem] text-brown-600"><strong className="text-caramel">{filtered.length}</strong> products found</p>
      </div>

      {/* Section header */}
      <div className="px-[5%] mb-6">
        <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-caramel" /><span className="text-caramel text-[.7rem] font-bold tracking-[.15em] uppercase">Our Menu</span></div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-brown-800 leading-tight">Made with <em className="italic text-caramel">love</em> & chocolate</h2>
      </div>

      {/* Grid */}
      <div className="px-[5%]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {[...Array(8)].map((_,i)=><div key={i} className="bg-cream rounded-2xl h-72 animate-pulse"/>)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            <AnimatePresence>
              {filtered.map((item,i)=>(
                <motion.div key={item.id} layout initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.9}} transition={{duration:.4,delay:i*.04}}>
                  <MenuCard item={item}/>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
