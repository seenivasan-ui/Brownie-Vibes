export default function MarqueeBanner() {
  const items = ['Homemade Brownies','Custom Birthday Cakes','Chocolate Drip Cakes','Cream Overflow Cakes','Venue Decoration','Donuts & Cookies','Mini Burgers','Pizza','Chocolate Fountain','FSSAI Registered','Tamil Nadu Delivery',"Trichy's Sweetest Spot"]
  const doubled = [...items,...items]
  return (
    <div className="bg-brown-700 overflow-hidden py-3">
      <div className="flex whitespace-nowrap" style={{animation:'marquee 24s linear infinite'}}>
        {doubled.map((t,i) => (
          <span key={i} className="inline-flex items-center gap-6 px-7 text-white/75 text-[.8rem] font-medium tracking-[.08em] uppercase">
            {t}<span className="text-gold text-[.6rem]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
