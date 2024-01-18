'use client'

import { useQuery } from '@apollo/client'

import { CurrencyContext } from '@/app/ParentWrapper'
import { GET_SPEND_ENTRIES } from '@/lib/queries'

import Form from './components/Form'
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

interface dataType {
  id: string
  firstname: string
  lastname: string
  email: string
  spendTypes: Array<string>
  entries: Array<EntryType>
}

export default function Entradas() {
  const { data, loading } = useQuery(GET_SPEND_ENTRIES)

  const spendEntries: dataType = data?.getSpendEntries || {}

  const { spendTypes, entries } = spendEntries

  return (
    <div className='saidas'>
      <h1>Saídas</h1>
      <Form loadingGeneral={loading} spendTypes={spendTypes || []} />
      <CurrencyContext.Consumer>
        {({ currency }) => (
          <Results
            entries={entries || []}
            currency={currency}
            loadingGeneral={loading}
          />
        )}
      </CurrencyContext.Consumer>
    </div>
  )
}
