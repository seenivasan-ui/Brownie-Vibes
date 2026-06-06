'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const {ref,inView} = useInView({triggerOnce:true,threshold:.1})
  return (
    <section id="about" className="py-20 px-[5%] bg-cream-dark grid grid-cols-1 lg:grid-cols-2 gap-[6%] items-center">
      {/* Images stack */}
      <motion.div ref={ref} initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}}
        className="relative h-[500px] hidden lg:block">
        <div className="absolute w-[72%] bottom-0 left-0 rounded-3xl overflow-hidden h-[88%] shadow-[0_20px_60px_rgba(44,21,7,.18)]">
          <Image src="/images/monisha.jpg" alt="Monisha – Founder Brownie Vibes" fill className="object-cover object-top"
            onError={(e)=>{(e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop'}}/>
        </div>
        <div className="absolute w-[50%] top-0 right-0 rounded-2xl overflow-hidden h-[50%] shadow-[0_8px_32px_rgba(44,21,7,.12)] border-4 border-cream-dark">
          <Image src="/images/cake1.jpg" alt="Brownie Vibes Custom Cake" fill className="object-cover"
            onError={(e)=>{(e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80&fit=crop'}}/>
        </div>
        <div className="absolute bottom-5 right-0 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(44,21,7,.12)]">
          <div className="font-dancing text-[1.3rem] text-brown-700">Monisha</div>
          <div className="text-[.7rem] text-brown-600">Founder & Baker</div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.15}}>
        <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-caramel"/><span className="text-caramel text-[.7rem] font-bold tracking-[.15em] uppercase">Our Story</span></div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-brown-800 leading-tight mb-5">Baked with love,<br/><em className="italic text-caramel">served with heart</em></h2>
        <p className="text-brown-600/75 leading-[1.8] mb-4">Brownie Vibes started in a home kitchen in Trichy — a simple idea to make people happy, one brownie at a time. Monisha began selling brownies to friends and family, and the response was overwhelming.</p>
        <p className="text-brown-600/75 leading-[1.8] mb-6">Today we're FSSAI registered, delivering across Tamil Nadu and setting up dream venues — from ₹10 brownies to elaborate birthday spreads with chocolate fountains.</p>
        <div className="flex gap-8 mb-7">
          {[['₹10','Starts At'],['166+','Happy Posts'],['100%','Homemade']].map(([n,l])=>(
            <div key={l}><div className="font-cormorant text-[2.2rem] font-bold text-caramel leading-none">{n}</div><div className="text-[.7rem] text-brown-600 uppercase tracking-[.08em] mt-1">{l}</div></div>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href="https://wa.me/919842916379" target="_blank" rel="noopener noreferrer" className="no-underline bg-caramel hover:bg-brown-700 text-white px-7 py-3.5 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(193,127,36,.4)]">💬 Order Now</a>
          <a href="https://instagram.com/_brownie_vibes_" target="_blank" rel="noopener noreferrer" className="no-underline border-[1.5px] border-brown-700 text-brown-700 hover:bg-brown-700 hover:text-white px-7 py-3.5 rounded-full font-medium transition-all hover:-translate-y-0.5">📸 Instagram</a>
        </div>
      </motion.div>
    </section>
  )
}
