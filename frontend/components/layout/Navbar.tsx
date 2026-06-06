'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'

const CAKE_MEGA = {
  'Birthday Cakes': ['Chocolate Drip Cake','Cream Overflow Cake','Fondant Cake','Photo Cakes','Number Cakes','Floral Cakes'],
  'Theme Cakes':    ['Princess Cakes','Unicorn Cakes','Superhero Cakes','Cartoon Cakes','Sports Cakes','Galaxy Cakes'],
  'By Occasion':    ['Anniversary','Wedding','Baby Shower','Engagement','Graduation','Farewell'],
  'By Flavour':     ['Chocolate Truffle','Red Velvet','Butterscotch','Vanilla','Pineapple','Black Forest'],
}
const BROWNIE_LINKS = ['Classic Fudge','Dark Chocolate','Nutella Swirl','Cream Cheese','Walnut Brownie','Blondie']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile]     = useState(false)
  const { count, toggleCart }   = useCartStore()
  const n = count()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-brown-800 text-white/70 text-[.75rem] text-center py-2 px-4 flex justify-center gap-6 flex-wrap">
        <span>🚚 Delivery within <strong className="text-gold-light">Tamil Nadu only</strong></span>
        <span>📞 <strong className="text-gold-light">98429 16379</strong></span>
        <span>⏰ Open Daily <strong className="text-gold-light">9 AM – 9 PM</strong></span>
        <span>✓ <strong className="text-gold-light">FSSAI Registered</strong></span>
      </div>

      <nav className={`sticky top-0 z-[1000] bg-white transition-shadow duration-300 ${scrolled?'shadow-[0_4px_30px_rgba(44,21,7,.1)]':'shadow-[0_2px_20px_rgba(44,21,7,.07)]'}`}>
        <div className="flex items-center justify-between px-[5%] h-[68px]">
          {/* Logo */}
          <Link href="/" className="font-dancing text-[1.9rem] text-brown-700 no-underline">
            Brownie <span className="text-caramel">Vibes</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex h-[68px] items-stretch list-none gap-0">
            {/* Cakes — mega */}
            <li className="relative group flex items-center">
              <a href="#menu" className="flex items-center gap-1 px-4 h-full text-[.875rem] font-medium text-brown-700 border-b-[2.5px] border-transparent group-hover:border-caramel group-hover:text-brown-600 transition-all no-underline">
                Cakes <ChevronDown size={12} className="group-hover:rotate-180 transition-transform"/>
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(44,21,7,.15)] border border-caramel/10 p-6 grid grid-cols-4 gap-5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {Object.entries(CAKE_MEGA).map(([col, links]) => (
                  <div key={col}>
                    <h4 className="text-[.68rem] font-bold tracking-[.12em] uppercase text-caramel mb-2 flex items-center gap-1">★ {col}</h4>
                    <ul className="list-none space-y-1">
                      {links.map(l => <li key={l}><a href="#menu" className="text-[.8rem] text-brown-600 hover:text-caramel hover:pl-1.5 block transition-all no-underline py-0.5">{l}</a></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
            {/* Brownies dropdown */}
            <li className="relative group flex items-center">
              <a href="#menu" className="flex items-center gap-1 px-4 h-full text-[.875rem] font-medium text-brown-700 border-b-[2.5px] border-transparent group-hover:border-caramel group-hover:text-brown-600 transition-all no-underline">
                Brownies <ChevronDown size={12} className="group-hover:rotate-180 transition-transform"/>
              </a>
              <div className="absolute top-full left-0 bg-white rounded-xl shadow-[0_8px_32px_rgba(44,21,7,.12)] border border-caramel/10 py-2 min-w-[180px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                {BROWNIE_LINKS.map(l => <a key={l} href="#menu" className="block px-4 py-2 text-[.83rem] text-brown-700 hover:bg-cream hover:text-caramel transition-colors no-underline">{l}</a>)}
              </div>
            </li>
            {[['#services','Venue Setup'],['#about','About Us'],['#contact','Contact']].map(([href,label]) => (
              <li key={label} className="flex items-center">
                <a href={href} className="flex items-center px-4 h-full text-[.875rem] font-medium text-brown-700 border-b-[2.5px] border-transparent hover:border-caramel hover:text-brown-600 transition-all no-underline">{label}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline bg-pink-light text-pink text-[.68rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">TN Only</span>
            <button onClick={toggleCart} className="relative bg-brown-700 text-white px-5 py-2.5 rounded-full text-[.875rem] font-semibold flex items-center gap-2 hover:bg-caramel hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(193,127,36,.35)] transition-all shimmer">
              <ShoppingCart size={15}/> <span className="hidden sm:inline">Cart</span>
              {n>0 && <span className="absolute -top-1.5 -right-1.5 bg-pink text-white w-5 h-5 rounded-full text-[.68rem] font-bold flex items-center justify-center border-2 border-white">{n}</span>}
            </button>
            <button className="lg:hidden p-2 text-brown-700" onClick={()=>setMobile(!mobile)}>
              {mobile ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobile && (
          <div className="lg:hidden bg-white border-t border-caramel/10 px-[5%] py-5 flex flex-col gap-4">
            {[['#menu','Cakes'],['#menu','Brownies'],['#services','Venue Setup'],['#about','About'],['#contact','Contact'],['#location','Find Us']].map(([h,l]) => (
              <a key={l} href={h} className="text-brown-700 font-medium no-underline hover:text-caramel transition-colors" onClick={()=>setMobile(false)}>{l}</a>
            ))}
            <Link href="/admin" className="text-brown-600/50 text-sm no-underline" onClick={()=>setMobile(false)}>Owner Login</Link>
          </div>
        )}
      </nav>
    </>
  )
}
