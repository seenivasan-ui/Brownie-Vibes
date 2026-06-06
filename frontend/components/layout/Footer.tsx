import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-brown-900 text-white/55 pt-16 pb-8 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 mb-8 border-b border-white/06">
        <div>
          <span className="font-dancing text-[2rem] text-white block mb-4">Brownie <span className="text-caramel">Vibes</span></span>
          <p className="text-[.85rem] leading-relaxed mb-5">Trichy's most loved homemade brownie café. Custom cakes, drip cakes, venue setups & more. FSSAI registered. Tamil Nadu delivery only. Made with love by Monisha.</p>
          <div className="flex gap-3">
            {[['https://instagram.com/_brownie_vibes_','📸'],['https://wa.me/919842916379','💬'],['tel:+919842916379','📞']].map(([h,i]) => (
              <a key={i} href={h} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/06 border border-white/10 flex items-center justify-center text-lg no-underline hover:bg-caramel hover:border-caramel hover:-translate-y-1 transition-all">{i}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white text-[.75rem] font-bold tracking-[.12em] uppercase mb-4">Menu</h4>
          <ul className="space-y-2.5 list-none">
            {['Brownies','Birthday Cakes','Drip Cakes','Cream Cakes','Donuts & Cookies','Venue Setup'].map(item => (
              <li key={item}><a href="#menu" className="no-underline text-white/55 text-[.85rem] hover:text-caramel transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-[.75rem] font-bold tracking-[.12em] uppercase mb-4">Info</h4>
          <ul className="space-y-2.5 list-none">
            <li><a href="#location" className="no-underline text-white/55 text-[.85rem] hover:text-caramel transition-colors">Find Us</a></li>
            <li><a href="#contact"  className="no-underline text-white/55 text-[.85rem] hover:text-caramel transition-colors">Order Now</a></li>
            <li><Link href="/about" className="no-underline text-white/55 text-[.85rem] hover:text-caramel transition-colors">About Us</Link></li>
            <li><a href="https://instagram.com/_brownie_vibes_" target="_blank" rel="noopener noreferrer" className="no-underline text-white/55 text-[.85rem] hover:text-caramel transition-colors">Instagram</a></li>
            <li><Link href="/admin" className="no-underline text-white/35 text-[.78rem] hover:text-gold transition-colors">Owner Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[.77rem]">
        <span>© {new Date().getFullYear()} Brownie Vibes, Trichy, Tamil Nadu · Made with 🍫 &amp; ❤️</span>
        <span>FSSAI Registered · Tamil Nadu Delivery · <Link href="/admin" className="text-caramel no-underline hover:text-gold">Owner Access</Link></span>
      </div>
    </footer>
  )
}
