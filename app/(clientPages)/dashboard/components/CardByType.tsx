import { useState } from 'react'

import { currencyType } from '@/app/ParentWrapper'
import Card from '@/components/Card/Card'
import Bar from '@/components/Charts/Bar'
import Select from '@/components/Select/Select'
import numAbsCurrency from '@/helpers/helpers'

type CardByTypeProps = {
  data: {
    id: string
    createdAt: string
    date: string
    description: string
    spendType: string
    value: number
  }[]
  currency: currencyType
}

export default function CardByType({ data, currency }: CardByTypeProps) {
  const types = [...new Set(data.map((item) => item.spendType))]

  const [selectedType, setSelectedType] = useState(types[0] || '')

  const filteredData = data.filter((item) => item.spendType === selectedType)
  const barData = filteredData.map((item) => ({
    type: item.description || item.spendType,
    value: item.value,
    name: item.spendType || '--',
  }))

  return (
    <div>
      <Card
        title={<span>Por tipo </span>}
        filter={
          <Select
            value={selectedType}
            onChange={setSelectedType}
            options={types}
          />
        }
      >
        <Bar
          data={barData}
          currency={currency}
          tooltipFormatter={(value: number) => [
            numAbsCurrency(value, currency.code),
          ]}
        />
      </Card>
    </div>
  )
}
