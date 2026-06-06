'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SVCS = [
  {i:'🍫',t:'Homemade Brownies',d:'Rich, fudgy, oven-fresh brownies starting at ₹10. The original Brownie Vibes experience.'},
  {i:'🎂',t:'Custom Birthday Cakes',d:'Drip cakes, fondant, cream overflow, photo cakes — any theme, any design.'},
  {i:'🎪',t:'Venue Setup & Décor',d:'Complete birthday setups with balloon décor, fairy lights, photo zones across Tamil Nadu.'},
  {i:'🍩',t:'Donuts & Cookies',d:'Glazed donuts, choco-chip cookies and brownie sandwiches — fresh daily.'},
  {i:'🍕',t:'Pizza & Mini Burgers',d:'Loaded mini pizzas and bite-sized burgers for your events.'},
  {i:'🍫',t:'Chocolate Fountain',d:'The showstopper of any event — a gorgeous flowing chocolate fountain.'},
  {i:'🚚',t:'Tamil Nadu Delivery',d:'We deliver across Tamil Nadu — sweet cravings, doorstep delivered.'},
  {i:'📸',t:'Instagram Reels',d:'Follow @_brownie_vibes_ for viral cake reveals and drip shot inspiration.'},
]

export default function ServicesSection() {
  const {ref,inView} = useInView({triggerOnce:true,threshold:.1})
  return (
    <section id="services" className="py-20 px-[5%]">
      <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-caramel"/><span className="text-caramel text-[.7rem] font-bold tracking-[.15em] uppercase">What We Do</span></div>
      <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-brown-800 mb-12 leading-tight">More than just <em className="italic text-caramel">brownies</em></h2>
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SVCS.map((s,i)=>(
          <motion.div key={s.t} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.07}}
            className="bg-pink-light rounded-2xl p-7 border border-transparent hover:bg-white hover:border-caramel hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(44,21,7,.12)] transition-all duration-300">
            <span className="text-4xl mb-4 block">{s.i}</span>
            <h3 className="font-cormorant text-[1.18rem] font-bold text-brown-800 mb-2">{s.t}</h3>
            <p className="text-[.82rem] text-brown-600/75 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
