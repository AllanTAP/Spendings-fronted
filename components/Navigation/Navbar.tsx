'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './navigation.module.scss'

const pagesList: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/metas', label: 'Metas' },
  { href: '/entradas', label: 'Entradas' },
  { href: '/saidas', label: 'Saídas' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <div className={styles.menu}>
      {pagesList.map((page) => (
        <div
          key={page.href}
          className={
            path === page.href ? `${styles.item} ${styles.active}` : styles.item
          }
        >
          <Link href={page.href}>{page.label}</Link>
        </div>
      ))}
    </div>
  )
}
