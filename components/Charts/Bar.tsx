import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { currencyType } from '@/app/ParentWrapper'
import numAbsCurrency from '@/helpers/helpers'

interface BarProps {
  data: {
    type: string
    value: number
    name: string
  }[]
  currency: currencyType
  tooltipFormatter?: (value: number, name: string) => string[]
}

export default function MyBar({ data, currency, tooltipFormatter }: BarProps) {
  return (
    <div className='bar'>
      <ResponsiveContainer width={800} height={300}>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='type' />
          <YAxis />
          <Tooltip
            formatter={
              tooltipFormatter ||
              ((value: number, name: string) => [
                numAbsCurrency(value, currency.code),
                name,
              ])
            }
          />
          <Bar
            dataKey='value'
            fill='#5B8CA8'
            activeBar={<Rectangle fill='#5BA892' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
