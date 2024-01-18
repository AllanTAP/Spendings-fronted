import React from 'react'
import dayjs from 'dayjs'
import filter from 'lodash/filter'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { CurrencyContext } from '@/app/ParentWrapper'
import Card from '@/components/Card/Card'
import numAbsCurrency from '@/helpers/helpers'

interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

type CardPaymentSpendProps = {
  spend: EntryType[]
  payment: EntryType[]
}

export default function CardPaymentSpend({
  spend,
  payment,
}: CardPaymentSpendProps) {
  const spendEntriesByMonth = filter(spend, (en: EntryType) => {
    return dayjs(en.date).isSame(dayjs(), 'month')
  })

  const spendTotalAmount = spendEntriesByMonth.reduce(
    (cb, current) => cb + current.value,
    0
  )

  const paymentEntriesByMonth = filter(payment, (en: EntryType) => {
    return dayjs(en.date).isSame(dayjs(), 'month')
  })

  const paymentTotalAmount = paymentEntriesByMonth.reduce(
    (cb, current) => cb + current.value,
    0
  )

  const paymentData = [
    {
      name: 'Valores totais',
      payment: paymentTotalAmount,
      spend: spendTotalAmount,
    },
  ]

  return (
    <CurrencyContext.Consumer>
      {({ currency }) => (
        <div>
          <Card title='Gastos x recebimentos'>
            <div className='bar'>
              <ResponsiveContainer width={800} height={300}>
                <BarChart
                  width={1500}
                  height={500}
                  data={paymentData}
                  layout='vertical'
                  barCategoryGap={'30%'}
                  // margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                >
                  <XAxis type='number' />
                  <YAxis type='category' hide width={150} dataKey='name' />
                  <Bar dataKey='payment' fill='green' />
                  <Bar dataKey='spend' fill='red' />
                  <Tooltip
                    shared={false}
                    formatter={(value: number, name: string, item) => [
                      numAbsCurrency(value, currency.code),
                      item.dataKey === 'spend' ? 'Gastos' : 'Recebimentos',
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </CurrencyContext.Consumer>
  )
}
