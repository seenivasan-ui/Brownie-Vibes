'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function LocationSection() {
  const {ref,inView} = useInView({triggerOnce:true,threshold:.1})
  return (
    <section id="location" className="py-20 px-[5%] bg-brown-900 grid grid-cols-1 lg:grid-cols-2 gap-[6%] items-center">
      <motion.div ref={ref} initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}} className="rounded-3xl overflow-hidden relative h-[400px]">
        <Image src="/images/shop.jpg" alt="Brownie Vibes Cafe – Fridays Road, Thiruvanaikoil, Trichy" fill className="object-cover"
          onError={(e)=>{(e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80&fit=crop'}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/65 to-transparent flex items-end p-6">
          <span className="font-dancing text-white text-[1.8rem]">Brownie Vibes Cafe</span>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.15}}>
        <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-gold"/><span className="text-gold text-[.7rem] font-bold tracking-[.15em] uppercase">Find Us</span></div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Come visit us<br/><em className="italic text-gold">in Trichy 📍</em></h2>
        {[
          {i:'📍',l:'Address',v:'Fridays Road, Thiruvanaikoil\nTrichy, Tamil Nadu'},
          {i:'📞',l:'Call / WhatsApp',v:'98429 16379 / 90803 32277'},
          {i:'⏰',l:'Hours',v:'Open Daily · 9 AM – 9 PM'},
          {i:'🚚',l:'Delivery Area',v:'Tamil Nadu Only'},
          {i:'📸',l:'Instagram',v:'@_brownie_vibes_'},
        ].map(d=>(
          <div key={d.l} className="flex items-start gap-4 py-4 border-b border-white/07 last:border-0">
            <span className="text-2xl flex-shrink-0 mt-0.5">{d.i}</span>
            <div>
              <div className="text-gold text-[.68rem] font-bold uppercase tracking-[.1em] mb-1">{d.l}</div>
              <div className="text-white/80 text-[.92rem] leading-relaxed whitespace-pre-line">{d.v}</div>
            </div>
          </div>
        ))}
        <a href="https://maps.google.com/?q=Brownie+Vibes+Cafe+Thiruvanaikoil+Trichy" target="_blank" rel="noopener noreferrer"
          className="no-underline mt-5 inline-block bg-caramel hover:bg-gold text-white font-semibold py-3.5 px-8 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(193,127,36,.4)]">
          🗺️ Open in Google Maps
        </a>
      </motion.div>
    </section>
  )
}
