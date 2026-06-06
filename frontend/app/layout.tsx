import type { Metadata } from 'next'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Cursor   from '@/components/ui/Cursor'
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import CartSidebar from '@/components/ui/CartSidebar'

export const metadata: Metadata = {
  title: 'Brownie Vibes – Homemade Brownies, Custom Cakes & Café | Trichy',
  description: "Trichy's most loved homemade brownies from ₹10. Custom birthday cakes, drip cakes, cream overflow cakes, venue setup & chocolate fountain. FSSAI registered. Tamil Nadu delivery. Fridays Road, Thiruvanaikoil, Trichy.",
  keywords: ['brownie vibes trichy','homemade brownies trichy','birthday cakes trichy','drip cake trichy','cream cake trichy','customized cakes thiruvanaikoil','venue setup trichy','chocolate fountain trichy','brownie cafe trichy','10 rupee brownie trichy'],
  openGraph: {
    title: 'Brownie Vibes – Brownies & Cakes | Trichy',
    description: 'Feeling Downie? Eat Brownie! From ₹10. Tamil Nadu delivery.',
    type: 'website', locale: 'en_IN', siteName: 'Brownie Vibes',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'FoodEstablishment',
          'name':'Brownie Vibes Cafe',
          'address':{'@type':'PostalAddress','streetAddress':'Fridays Road, Thiruvanaikoil','addressLocality':'Trichy','addressRegion':'Tamil Nadu','addressCountry':'IN'},
          'telephone':'+919842916379','servesCuisine':['Desserts','Bakery'],
          'priceRange':'₹10-₹2000','openingHours':'Mo-Su 09:00-21:00',
          'areaServed':'Tamil Nadu',
          'sameAs':['https://www.instagram.com/_brownie_vibes_'],
        })}} />
      </head>
      <body>
        <Cursor />
        <Navbar />
        <CartSidebar />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-center" toastOptions={{
          style: { background:'#2C1507', color:'#FDF8F0', fontFamily:'Outfit,sans-serif', fontWeight:'600', borderRadius:'50px', padding:'13px 26px', fontSize:'.88rem' }
        }} />
      </body>
    </html>
  )
}
