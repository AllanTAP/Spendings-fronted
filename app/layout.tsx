import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ApolloWrapper } from '@/lib/apollo-wrapper'

import 'dayjs/locale/pt-br'

import StyledComponentsRegistry from '../lib/AntdRegistry'
import ParentProvider from './ParentWrapper'

import './main.scss'

const inter = Poppins({
  weight: ['100', '200', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Spedings App',
  description: 'Created by AllanTAP',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <ApolloWrapper>
          <ParentProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ParentProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
