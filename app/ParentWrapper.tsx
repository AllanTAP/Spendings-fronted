'use client'
import { createContext, useState } from 'react'
import { useQuery } from '@apollo/client'

import { GET_CURRENCY } from '@/lib/queries'

export type currencyType = {
  code: string
  symbol: string
  currency: string
}

interface currencies {
  [key: string]: currencyType
}

export type currencyContextType = {
  currency: currencyType
  setCurrency: (currency: currencyType) => void
  loading: boolean
}

type userCurrencyTypes = {
  getUserCurrency: 'BRL' | 'EUR' | 'USD'
}

export const currencyTypes: currencies = {
  EUR: {
    code: 'eur',
    symbol: '€',
    currency: 'Euro',
  },
  BRL: {
    code: 'brl',
    symbol: 'R$',
    currency: 'Real',
  },
  USD: {
    code: 'usd',
    symbol: '$',
    currency: 'Dolar',
  },
}

export const CurrencyContext = createContext<currencyContextType>({
  currency: currencyTypes.eur,
  setCurrency: () => null,
  loading: false,
})

export default function ParentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currency, setCurrency] = useState<currencyType>(currencyTypes.BRL)
  const { loading } = useQuery(GET_CURRENCY, {
    onCompleted: ({ getUserCurrency }: userCurrencyTypes) => {
      setCurrency(currencyTypes[getUserCurrency])
    },
  })

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: (currency: currencyType) => setCurrency(currency),
        loading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}
