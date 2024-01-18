import { useState } from 'react'
import locale from 'antd/es/date-picker/locale/pt_BR'
import { DatePicker, DatePickerProps } from 'antd/lib'
import dayjs, { Dayjs } from 'dayjs'
import { filter, groupBy, map, sumBy } from 'lodash'

import { currencyType } from '@/app/ParentWrapper'
import Card from '@/components/Card/Card'
import Pie from '@/components/Charts/Pie'

interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

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

export default function CardByMonth({ data, currency }: CardByTypeProps) {
  // const types = [...new Set(data.map((item) => item.spendType))]

  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs())

  const onChange: DatePickerProps['onChange'] = (date) => {
    setSelectedMonth(date)
  }

  const entriesByMonth = filter(data, (en: EntryType) => {
    return dayjs(en.date).isSame(selectedMonth, 'month')
  })

  const grouppedByType = map(
    groupBy(entriesByMonth, 'spendType'),
    (objs, key) => ({
      type: key,
      value: sumBy(objs, 'value'),
      name: key,
    })
  )
  // const filteredData = data.filter((item) => item.spendType === selectedType)
  // const barData = filteredData.map((item) => ({
  //   type: item.description || item.spendType,
  //   value: item.value,
  //   name: item.spendType || '--',
  // }))

  return (
    <div>
      <Card
        title={<span>Por categoria</span>}
        filter={
          <DatePicker
            defaultValue={dayjs()}
            onChange={onChange}
            picker='month'
            format={'MMMM'}
            locale={locale}
          />
        }
      >
        <Pie dataList={[grouppedByType]} currency={currency} />
      </Card>
    </div>
  )
}
