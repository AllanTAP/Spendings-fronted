'use client'

import { useQuery } from '@apollo/client'

import { CurrencyContext } from '@/app/ParentWrapper'
import { GET_PAYMENT_ENTRIES } from '@/lib/queries'

import Form from './components/Form'
import Results from './components/Results'

interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

interface dataType {
  paymentTypes: Array<string>

  paymentEntries: Array<EntryType>
}

export default function Entradas() {
  const { data, loading } = useQuery(GET_PAYMENT_ENTRIES)

  const paymentEntries: dataType = data?.getPaymentEntries || {}

  return (
    <div className='entradas'>
      <h1>Entradas</h1>
      <Form
        loadingGeneral={loading}
        paymentTypes={paymentEntries?.paymentTypes || []}
      />
      <CurrencyContext.Consumer>
        {({ currency }) => (
          <Results
            entries={paymentEntries?.paymentEntries || []}
            currency={currency}
            loadingGeneral={loading}
          />
        )}
      </CurrencyContext.Consumer>
    </div>
  )
}
