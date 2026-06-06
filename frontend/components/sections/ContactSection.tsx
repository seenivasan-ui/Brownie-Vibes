'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const {ref,inView} = useInView({triggerOnce:true,threshold:.1})
  const [form,setForm] = useState({name:'',type:'',msg:''})

  const send = () => {
    if (!form.name) { toast.error('Please enter your name!'); return }
    const t = `Hi Brownie Vibes! 🍫\n\nMy name is ${form.name}.\nI'm interested in: ${form.type||'General enquiry'}\n\n${form.msg?'Details: '+form.msg:''}\n\nDelivery: Tamil Nadu\nPlease get back to me. Thank you! 🙏`
    window.open(`https://wa.me/919842916379?text=${encodeURIComponent(t)}`, '_blank')
  }

  return (
    <section id="contact" className="py-20 px-[5%] bg-cream grid grid-cols-1 lg:grid-cols-2 gap-[5%] items-start">
      <motion.div ref={ref} initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}} className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 mb-1"><span className="w-6 h-[1.5px] bg-caramel"/><span className="text-caramel text-[.7rem] font-bold tracking-[.15em] uppercase">Order Now</span></div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-brown-800 leading-tight mb-2">Ready to <em className="italic text-caramel">indulge?</em></h2>
        <p className="text-brown-600/75 mb-3">Monisha personally handles every single order. WhatsApp or Instagram for fastest response!</p>

        {/* Monisha card */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(44,21,7,.08)] flex items-center gap-4">
          <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0 ring-[3px] ring-caramel/20">
            <Image src="/images/monisha.jpg" alt="Monisha" fill className="object-cover object-top"
              onError={(e)=>{(e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80'}}/>
          </div>
          <div>
            <div className="font-cormorant text-xl font-bold text-brown-800">Monisha</div>
            <div className="text-[.73rem] text-brown-600 mb-1.5">Founder & Baker, Brownie Vibes</div>
            <div className="flex items-center gap-1.5 text-[.73rem] text-green-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>Available for orders
            </div>
          </div>
        </div>

        {[
          {href:`https://wa.me/919842916379?text=${encodeURIComponent("Hi Brownie Vibes! I'd like to place an order 🧁")}`,cls:'bg-[#25D366] hover:shadow-[0_12px_40px_rgba(37,211,102,.4)]',icon:'💬',sub:'Chat & Order on',label:'WhatsApp — 98429 16379'},
          {href:'https://instagram.com/_brownie_vibes_',cls:'hover:shadow-[0_12px_40px_rgba(221,42,123,.4)]',style:{background:'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)'},icon:'📸',sub:'DM us on',label:'Instagram — @_brownie_vibes_'},
          {href:'tel:+919842916379',cls:'bg-brown-700 hover:bg-caramel',icon:'📞',sub:'Call us directly',label:'98429 16379 / 90803 32277'},
        ].map((b,i)=>(
          <a key={i} href={b.href} target={b.href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer" style={b.style}
            className={`no-underline flex items-center gap-4 p-4 rounded-2xl text-white font-semibold transition-all hover:-translate-y-1 ${b.cls}`}>
            <span className="text-2xl w-10 text-center">{b.icon}</span>
            <div><span className="block text-[.68rem] font-normal opacity-80">{b.sub}</span>{b.label}</div>
          </a>
        ))}
      </motion.div>

      <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.1}}
        className="bg-white rounded-3xl p-7 shadow-[0_4px_20px_rgba(44,21,7,.08)]">
        <h3 className="font-cormorant text-2xl font-bold text-brown-800 mb-5">Quick Enquiry</h3>
        {[
          {label:'Your Name',id:'n',type:'input',placeholder:'e.g. Priya'},
        ].map(f=>(
          <div key={f.id} className="mb-4">
            <label className="block text-[.68rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-1.5">{f.label}</label>
            <input type="text" placeholder={f.placeholder} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
              className="w-full px-4 py-3 border-[1.5px] border-caramel/20 rounded-xl text-[.92rem] text-brown-800 bg-cream outline-none focus:border-caramel focus:shadow-[0_0_0_3px_rgba(193,127,36,.1)] transition-all"/>
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-[.68rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-1.5">What are you looking for?</label>
          <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}
            className="w-full px-4 py-3 border-[1.5px] border-caramel/20 rounded-xl text-[.92rem] text-brown-800 bg-cream outline-none focus:border-caramel transition-all">
            <option value="">Select...</option>
            {['Brownies','Birthday Cake','Drip Cake','Cream Overflow Cake','Venue Setup','Chocolate Fountain','Donuts & Cookies','Custom Order'].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-[.68rem] font-bold tracking-[.1em] uppercase text-brown-600 mb-1.5">Message / Details</label>
          <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Date, theme, quantity, delivery area..." rows={4}
            className="w-full px-4 py-3 border-[1.5px] border-caramel/20 rounded-xl text-[.92rem] text-brown-800 bg-cream outline-none focus:border-caramel transition-all resize-none"/>
        </div>
        <button onClick={send} className="w-full bg-brown-700 hover:bg-caramel text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(193,127,36,.3)] shimmer">
          💬 Send via WhatsApp
        </button>
      </motion.div>
    </section>
  )
}
