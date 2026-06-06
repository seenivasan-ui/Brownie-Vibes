import { create } from 'zustand'

export interface MenuItem {
  id: string; name: string; description: string; price: number
  category: string; emoji: string; image?: string
  badge?: string; tags?: string[]; available: boolean
}
interface CartItem extends MenuItem { qty: number }

interface CartStore {
  items: CartItem[]; isOpen: boolean
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  toggleCart: () => void
  total: () => number; count: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [], isOpen: false,
  addItem: (item) => {
    const ex = get().items.find(i => i.id === item.id)
    ex ? set({ items: get().items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) })
       : set({ items: [...get().items, { ...item, qty: 1 }] })
  },
  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  updateQty: (id, delta) => {
    const updated = get().items.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
    set({ items: updated.filter(i => i.qty > 0) })
  },
  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
  total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
  count: () => get().items.reduce((s, i) => s + i.qty, 0),
}))

interface AuthStore {
  isOwner: boolean; token: string | null
  login: (token: string) => void; logout: () => void
}
export const useAuthStore = create<AuthStore>((set) => ({
  isOwner: false, token: null,
  login: (token) => { set({ isOwner: true, token }); localStorage.setItem('bv_token', token) },
  logout: () => { set({ isOwner: false, token: null }); localStorage.removeItem('bv_token') },
}))
