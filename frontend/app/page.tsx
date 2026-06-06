import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us – Brownie Vibes | Monisha, Trichy',
  description: "Meet Monisha – the heart and soul behind Brownie Vibes, Trichy's most loved homemade brownie café.",
}

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <section className="min-h-[60vh] bg-brown-900 px-[5%] py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2.5 mb-3"><span className="w-6 h-[1.5px] bg-gold"/><span className="text-gold text-[.7rem] font-bold tracking-[.15em] uppercase">Our Story</span></div>
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white leading-tight mb-5">Baked with love,<br/><em className="italic text-gold">served with heart</em></h1>
          <p className="text-white/70 leading-relaxed text-[1.05rem]">Brownie Vibes started as a dream in a home kitchen in Trichy — a simple idea to make people happy, one brownie at a time. FSSAI registered, Tamil Nadu delivery, made fresh by Monisha.</p>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(44,21,7,.3)] relative">
              <Image src="/images/monisha.jpg" alt="Monisha – Founder, Brownie Vibes" fill className="object-cover object-top"/>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-caramel text-white rounded-2xl px-5 py-3 shadow-[0_8px_28px_rgba(193,127,36,.4)]">
              <div className="font-dancing text-xl">Monisha</div><div className="text-xs opacity-80">Founder & Baker</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-[5%] bg-cream-dark grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-72 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(44,21,7,.12)] relative rotate-2">
              <Image src="/images/monisha2.jpg" alt="Monisha at Brownie Vibes" fill className="object-cover"/>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-cream-dark shadow-[0_4px_16px_rgba(44,21,7,.12)] relative">
              <Image src="/images/logo.jpg" alt="Brownie Vibes Logo" fill className="object-cover"/>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_rgba(44,21,7,.1)] max-w-[150px]">
              <p className="font-dancing text-brown-700 text-sm leading-tight">"Feeling Downie? Eat Brownie!"</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2.5 mb-2"><span className="w-6 h-[1.5px] bg-caramel"/><span className="text-caramel text-[.7rem] font-bold tracking-[.15em] uppercase">Meet the Baker</span></div>
          <h2 className="font-cormorant text-4xl font-bold text-brown-800 leading-tight mb-4">Hi, I'm <em className="italic text-caramel">Monisha!</em></h2>
          <p className="text-brown-600/75 leading-[1.8] mb-4">I'm the heart and hands behind every Brownie Vibes creation. I believe food is love — and nothing says love louder than a warm, fresh-from-the-oven brownie.</p>
          <p className="text-brown-600/75 leading-[1.8] mb-6">FSSAI certified, Instagram-obsessed (@_brownie_vibes_), and absolutely passionate about making your celebrations sweeter and more memorable.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="https://wa.me/919842916379" target="_blank" rel="noopener noreferrer" className="no-underline bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(37,211,102,.3)] transition-all">💬 WhatsApp Me</a>
            <a href="https://instagram.com/_brownie_vibes_" target="_blank" rel="noopener noreferrer" className="no-underline border-[1.5px] border-brown-700 text-brown-700 px-6 py-3 rounded-full font-medium hover:bg-brown-700 hover:text-white transition-all hover:-translate-y-0.5">📸 Instagram</a>
          </div>
        </div>
      </section>
    </div>
  )
}
