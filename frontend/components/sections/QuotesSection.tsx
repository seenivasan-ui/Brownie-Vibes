'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const QUOTES = [
  {t:'Life is short. Eat the brownie first.',a:'— Brownie Vibes Mantra'},
  {t:"A cake is just a reason to gather the people you love in one place.",a:'— Every Birthday Ever'},
  {t:"Chocolate doesn't ask silly questions. Chocolate understands.",a:'— A Very Wise Person'},
  {t:"Stressed spelled backwards is desserts. Coincidence? We think not.",a:'— Sweet Wisdom'},
  {t:"The secret ingredient is always love. And chocolate. Mostly chocolate.",a:'— Monisha, Brownie Vibes'},
  {t:"Home is where the brownie is warm and the memories are sweeter.",a:'— Brownie Vibes, Trichy'},
]

export default function QuotesSection() {
  const {ref,inView} = useInView({triggerOnce:true,threshold:.1})
  return (
    <section className="py-24 px-[5%] bg-brown-900 relative overflow-hidden">
      <div className="absolute top-[-60px] left-[4%] font-cormorant text-[28rem] text-white/[.025] leading-none pointer-events-none select-none">"</div>
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-gold"/><span className="text-gold text-[.7rem] font-bold tracking-[.15em] uppercase">Sweet Wisdom</span></div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">Words that taste like <em className="italic text-gold">chocolate</em></h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUOTES.map((q,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6,delay:i*.08}}
              className="p-8 rounded-2xl border border-white/07 hover:bg-caramel/08 hover:border-caramel/35 hover:-translate-y-1.5 transition-all duration-300"
              style={{background:'rgba(255,255,255,.025)'}}>
              <span className="font-cormorant text-[3.5rem] text-caramel/70 leading-[.8] block mb-3">"</span>
              <p className="font-cormorant text-[1.08rem] italic text-white/83 leading-[1.7] mb-4">{q.t}</p>
              <span className="text-caramel text-[.72rem] font-bold tracking-[.1em] uppercase">{q.a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
