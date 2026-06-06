'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Plus, Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore, MenuItem } from '@/lib/store'

const BADGE_STYLES: Record<string,string> = {
  bestseller:'bg-caramel text-white',new:'bg-green-600 text-white',
  trending:'bg-pink text-white',custom:'bg-brown-700 text-white',
}
const BADGE_LABELS: Record<string,string> = {
  bestseller:'⭐ Bestseller',new:'🆕 New',trending:'🔥 Trending',custom:'✨ Custom',
}

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCartStore()
  const [imgErr, setImgErr] = useState(false)
  const [liked, setLiked]   = useState(false)

  const mx = useMotionValue(0); const my = useMotionValue(0)
  const rx = useSpring(useTransform(my,[-.5,.5],[6,-6]),{stiffness:300,damping:30})
  const ry = useSpring(useTransform(mx,[-.5,.5],[-6,6]),{stiffness:300,damping:30})
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5)
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); addItem(item); toast.success(`${item.emoji} ${item.name} added!`)
  }

  return (
    <motion.div style={{rotateX:rx,rotateY:ry,transformStyle:'preserve-3d'}}
      onMouseMove={onMove} onMouseLeave={()=>{mx.set(0);my.set(0)}}
      whileHover={{y:-12,scale:1.02}} transition={{type:'spring',stiffness:280,damping:24}}
      className="pcard bg-white rounded-2xl overflow-hidden border border-caramel/08 relative group"
    >
      {/* Badge */}
      {item.badge && <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[.67rem] font-bold uppercase tracking-wide ${BADGE_STYLES[item.badge]||'bg-caramel text-white'}`}>{BADGE_LABELS[item.badge]||item.badge}</div>}

      {/* Wishlist */}
      <button onClick={()=>setLiked(!liked)} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 ${liked?'text-pink':'text-brown-600 hover:text-pink'}`}>
        <Heart size={14} fill={liked?'currentColor':'none'}/>
      </button>

      {/* Image */}
      <div className="pcard-img relative h-52 overflow-hidden bg-cream-dark">
        {item.image && !imgErr ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" onError={()=>setImgErr(true)} sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-cream to-cream-dark">{item.emoji}</div>
        )}
        {/* Dark overlay on hover */}
        <div className="pcard-overlay absolute inset-0 bg-brown-900/68 backdrop-blur-[2px] flex items-center justify-center">
          <motion.button whileHover={{scale:1.08}} whileTap={{scale:.95}} onClick={handleAdd}
            className="bg-caramel text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shimmer">
            <Plus size={15}/> Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="text-[.67rem] font-bold tracking-[.1em] uppercase text-caramel mb-1">{item.category}</div>
        <h3 className="font-cormorant text-[1.12rem] font-bold text-brown-800 mb-1.5 leading-tight">{item.name}</h3>
        <p className="text-[.78rem] text-brown-600/65 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        {item.tags?.length ? (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {item.tags.map(t => <span key={t} className="text-[.65rem] px-2 py-0.5 rounded-full bg-cream text-brown-600 border border-caramel/15">{t}</span>)}
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-cormorant text-[1.45rem] font-bold text-caramel leading-none">₹{item.price}</span>
            <span className="block text-[.65rem] text-brown-600/60 mt-0.5">{['cakes','drip','cream','custom'].includes(item.category)?'per cake':'per piece'}</span>
          </div>
          <motion.button whileHover={{scale:1.2,rotate:90}} whileTap={{scale:.9}} onClick={handleAdd}
            className="w-9 h-9 rounded-full bg-brown-700 hover:bg-caramel text-white flex items-center justify-center transition-colors">
            <Plus size={17}/>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
