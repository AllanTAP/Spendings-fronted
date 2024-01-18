'use client'

import { useQuery } from '@apollo/client'

import { CurrencyContext } from '@/app/ParentWrapper'
import { GET_PAYMENT_ENTRIES, GET_SPEND_ENTRIES } from '@/lib/queries'

import Results from './components/Results'

import './style.scss'

interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

interface dataSpendType {
  spendTypes: Array<string>
  entries: Array<EntryType>
}

interface dataPaymentType {
  paymentTypes: Array<string>
  paymentEntries: Array<EntryType>
}

export default function Dashboard() {
  const { data: spendData, loading: spendLoading } = useQuery(GET_SPEND_ENTRIES)
  const { data: paymentData, loading: paymentLoading } =
    useQuery(GET_PAYMENT_ENTRIES)

  const spendEntries: dataSpendType = spendData?.getSpendEntries || {}
  const paymentEntries: dataPaymentType = paymentData?.getPaymentEntries || {}

  const { entries } = spendEntries

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <CurrencyContext.Consumer>
        {({ currency }) => (
          <Results
            spendEntries={entries || []}
            paymentEntries={paymentEntries?.paymentEntries || []}
            currency={currency}
            loadingGeneral={spendLoading || paymentLoading}
          />
        )}
      </CurrencyContext.Consumer>
    </div>
  )
}
