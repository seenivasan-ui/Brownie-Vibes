'use client'
import { useEffect, useRef } from 'react'
export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current)  { dot.current.style.left  = e.clientX+'px'; dot.current.style.top  = e.clientY+'px' }
      if (ring.current) { ring.current.style.left = e.clientX+'px'; ring.current.style.top = e.clientY+'px' }
    }
    const on  = () => { dot.current?.classList.add('hov');  ring.current?.classList.add('hov') }
    const off = () => { dot.current?.classList.remove('hov'); ring.current?.classList.remove('hov') }
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off) })
    return () => document.removeEventListener('mousemove', move)
  }, [])
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>)
}
