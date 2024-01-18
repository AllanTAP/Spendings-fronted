import { ReactNode } from 'react'

import Header from './header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className='content'>{children}</div>
    </div>
  )
}
