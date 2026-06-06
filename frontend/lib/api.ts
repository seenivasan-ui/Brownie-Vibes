import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

API.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('bv_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const menuAPI = {
  getAll:   (cat?: string) => API.get(`/api/menu${cat ? `?category=${cat}` : ''}`),
  create:   (data: any)    => API.post('/api/menu', data),
  update:   (id: string, data: any) => API.put(`/api/menu/${id}`, data),
  delete:   (id: string)   => API.delete(`/api/menu/${id}`),
}
export const authAPI = {
  login: (username: string, password: string) => API.post('/api/auth/login', { username, password }),
}
export const ordersAPI = {
  getAll:  () => API.get('/api/orders'),
  create:  (data: any) => API.post('/api/orders', data),
}

// ── Fallback menu shown when API is offline ─────────────────
export const DEFAULT_MENU = [
  {id:'1',name:'Classic Fudge Brownie',description:'Dense, gooey, OG Brownie Vibes recipe.',price:10,category:'brownies',emoji:'🍫',image:'/images/cake1.jpg',badge:'bestseller',tags:['Homemade','Fudgy'],available:true},
  {id:'2',name:'Dark Chocolate Brownie',description:'Intense 70% dark chocolate.',price:30,category:'brownies',emoji:'🖤',image:'/images/cake2.jpg',badge:'',tags:['Dark','Rich'],available:true},
  {id:'3',name:'Nutella Swirl Brownie',description:'Fudgy brownie with Nutella ribbon.',price:45,category:'brownies',emoji:'🌀',image:'/images/cake3.jpg',badge:'trending',tags:['Nutella'],available:true},
  {id:'4',name:'Cream Cheese Brownie',description:'Dense brownie with cream cheese layer.',price:50,category:'brownies',emoji:'🧀',image:'/images/cake4.jpg',badge:'',tags:['Cream'],available:true},
  {id:'5',name:'Chocolate Drip Cake',description:'Spectacular cascading chocolate drip.',price:650,category:'drip',emoji:'🎂',image:'/images/cake5.jpg',badge:'bestseller',tags:['Drip','Birthday'],available:true},
  {id:'6',name:'Cream Overflow Cake (0.5kg)',description:'Luscious cream cascading over the edges.',price:450,category:'cream',emoji:'🍦',image:'/images/cake1.jpg',badge:'trending',tags:['Cream','Cascade'],available:true},
  {id:'7',name:'Custom Theme Cake (0.5kg)',description:'You dream it, Monisha bakes it.',price:500,category:'custom',emoji:'🎨',image:'/images/cake2.jpg',badge:'custom',tags:['Custom'],available:true},
  {id:'8',name:'Red Velvet Cake (1kg)',description:'Classic red velvet, cream cheese frosting.',price:850,category:'cakes',emoji:'❤️',image:'/images/cake3.jpg',badge:'',tags:['Red Velvet'],available:true},
  {id:'9',name:'Butterscotch Cake (0.5kg)',description:'Fluffy butterscotch with praline crunch.',price:400,category:'cakes',emoji:'🍰',image:'/images/cake4.jpg',badge:'',tags:['Butterscotch'],available:true},
  {id:'10',name:'Choco-Chip Cookie',description:'Crispy edges, chewy centre.',price:30,category:'cookies',emoji:'🍪',image:'/images/cake5.jpg',badge:'',tags:['Cookie'],available:true},
  {id:'11',name:'Glazed Donut',description:'Soft donuts with sugar glaze.',price:40,category:'donuts',emoji:'🍩',image:'/images/cake1.jpg',badge:'trending',tags:['Donut'],available:true},
  {id:'12',name:'Mini Pizza',description:'Loaded mini pizzas with cheese pull.',price:120,category:'savory',emoji:'🍕',image:'/images/cake2.jpg',badge:'',tags:['Pizza'],available:true},
  {id:'13',name:'Mini Burger (2 pcs)',description:'Bite-sized burgers with fresh veggies.',price:80,category:'savory',emoji:'🍔',image:'/images/cake3.jpg',badge:'',tags:['Burger'],available:true},
]
