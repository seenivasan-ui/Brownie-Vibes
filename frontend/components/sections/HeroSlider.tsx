'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  { img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=85&fit=crop', eyebrow:'Brownie Vibes · Trichy', title:'Magic in', titleEm:'Every Wish', sub:'Custom birthday cakes with luscious cream overflow & cascading chocolate drip', cta1:{label:'🎂 Order Cake',href:'#menu'}, cta2:{label:'💬 WhatsApp Us',href:'https://wa.me/919842916379'} },
  { img:'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=1600&q=85&fit=crop', eyebrow:'From just ₹10', title:'Feeling Downie?', titleEm:'Eat Brownie.', sub:"Trichy's most loved homemade brownies — dense, fudgy, oven-fresh. Starting at ₹10", cta1:{label:'🍫 Explore Brownies',href:'#menu'}, cta2:{label:'📍 Fridays Road, Trichy',href:'#location'} },
  { img:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600&q=85&fit=crop', eyebrow:'Complete Event Setup', title:'Your Dream', titleEm:'Celebration', sub:'Venue decoration, chocolate fountain, birthday cakes — we make it unforgettable', cta1:{label:'🎪 View Services',href:'#services'}, cta2:{label:'📞 Book Now',href:'https://wa.me/919842916379'} },
  { img:'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1600&q=85&fit=crop', eyebrow:'Never Stop Wishing', title:'Classic Cakes,', titleEm:'Pure Love', sub:'Butterscotch, Red Velvet, Chocolate Truffle — Tamil Nadu delivery on all orders', cta1:{label:'🎂 Shop Cakes',href:'#menu'}, cta2:{label:'🔍 Browse All',href:'#menu'} },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)

  const go = useCallback((n: number) => setCur((n + SLIDES.length) % SLIDES.length), [])
  useEffect(() => { const t = setInterval(() => go(cur + 1), 5500); return () => clearInterval(t) }, [cur, go])

  return (
    <section className="relative h-[88vh] min-h-[540px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div key={cur} className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
          <Image src={SLIDES[cur].img} alt={SLIDES[cur].titleEm} fill className="object-cover scale-105 animate-[scaleIn_8s_ease_forwards]" priority={cur===0} />
          <div className="absolute inset-0 bg-gradient-to-r from-brown-900/75 via-brown-900/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute top-1/2 left-[8%] -translate-y-1/2 text-white max-w-[560px] z-10">
        <motion.div key={`ey-${cur}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="flex items-center gap-2.5 text-[.77rem] font-semibold tracking-[.15em] uppercase text-gold-light mb-4">
          <span className="w-7 h-[1.5px] bg-gold-light" />{SLIDES[cur].eyebrow}
        </motion.div>
        <motion.h1 key={`h-${cur}`} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.35}} className="font-cormorant text-[clamp(3rem,6.5vw,5.5rem)] font-bold leading-[1.06] mb-4">
          {SLIDES[cur].title}<br/><em className="italic text-gold-light">{SLIDES[cur].titleEm}</em>
        </motion.h1>
        <motion.p key={`s-${cur}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}} className="text-[1.05rem] text-white/80 mb-7 leading-relaxed">{SLIDES[cur].sub}</motion.p>
        <motion.div key={`b-${cur}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.65}} className="flex gap-3 flex-wrap">
          <a href={SLIDES[cur].cta1.href} className="bg-caramel text-white px-8 py-4 rounded-full font-semibold text-[.95rem] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(193,127,36,.45)] transition-all shimmer no-underline">{SLIDES[cur].cta1.label}</a>
          <a href={SLIDES[cur].cta2.href} target={SLIDES[cur].cta2.href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer" className="bg-transparent border-[1.5px] border-white/60 text-white px-8 py-4 rounded-full font-medium text-[.95rem] hover:bg-white/12 hover:border-white hover:-translate-y-1 transition-all no-underline">{SLIDES[cur].cta2.label}</a>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-[8%] flex gap-2.5 z-10">
        {SLIDES.map((_,i) => <button key={i} onClick={()=>go(i)} className={`h-[3px] rounded-full transition-all duration-300 ${i===cur?'w-12 bg-gold-light':'w-7 bg-white/35'}`} />)}
      </div>
      {/* Arrows */}
      <div className="absolute bottom-8 right-[8%] flex gap-2.5 z-10">
        {['←','→'].map((a,i) => <button key={a} onClick={()=>go(cur+(i===0?-1:1))} className="w-11 h-11 rounded-full border-[1.5px] border-white/40 bg-white/08 text-white backdrop-blur-sm hover:bg-white/22 transition-all flex items-center justify-center text-base">{a}</button>)}
      </div>
    </section>
  )
}
