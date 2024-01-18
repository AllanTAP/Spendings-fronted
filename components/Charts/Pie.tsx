import {
  Cell,
  Pie as PieRechars,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { currencyType } from '@/app/ParentWrapper'
import numAbsCurrency from '@/helpers/helpers'

type dataType = {
  name: string
  value: number
}
type PieProps = {
  dataList: dataType[][]
  currency: currencyType
}

const colors = [
  '#5BA892',
  '#5B8CA8',
  '#9E5BA8',
  '#2F574B',
  '#333027',
  '#8AFFDE',
]

export default function Pie({ dataList, currency }: PieProps) {
  return (
    <div className={'pie'}>
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          {dataList.map((item: dataType[], index: number) => {
            return (
              <>
                <PieRechars
                  key={index}
                  data={item}
                  dataKey={'value'}
                  nameKey={'name'}
                  // cx="50%"
                  // cy="50%"
                  innerRadius={'20%'}
                  outerRadius={'90%'}
                  fill='#5BA892'
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const RADIAN = Math.PI / 180
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)
                    if (percent > 0.05)
                      return (
                        <text
                          x={x}
                          y={y}
                          fill='white'
                          textAnchor='middle'
                          dominantBaseline='central'
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      )
                  }}
                  // legendType='square'
                >
                  {item.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </PieRechars>
                {/* <Legend /> */}
                <Tooltip
                  formatter={(value: number, name: string) => [
                    numAbsCurrency(value, currency.code),
                    name,
                  ]}
                />
              </>
            )
          })}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
