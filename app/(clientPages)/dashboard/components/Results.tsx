import { Col, Row } from 'antd'
import dayjs from 'dayjs'
import { sumBy } from 'lodash'
import filter from 'lodash/filter'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

import { currencyType } from '@/app/ParentWrapper'
import Card from '@/components/Card/Card'
import Pie from '@/components/Charts/Pie'
import numAbsCurrency from '@/helpers/helpers'

import CardByMonth from './CardByMonth'
import CardByType from './CardByType'
import CardPaymentSpend from './CardPaymentSpend'
interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

interface ResultsType {
  spendEntries: Array<EntryType>
  paymentEntries: Array<EntryType>
  currency: currencyType
  loadingGeneral: boolean
}

export default function Results({
  spendEntries,
  paymentEntries,
  currency, // loadingGeneral,
}: ResultsType) {
  dayjs.locale('pt')

  const entriesByMonth = filter(spendEntries, (en: EntryType) => {
    return dayjs(en.date).isSame(dayjs(), 'month')
  })

  const grouppedByType = map(
    groupBy(entriesByMonth, 'spendType'),
    (objs, key) => ({
      type: key,
      value: sumBy(objs, 'value'),
      name: key,
    })
  )

  const totalAmount = entriesByMonth.reduce(
    (cb, current) => cb + current.value,
    0
  )

  return (
    <div className='results'>
      <Row justify='center' align='middle' gutter={[32, 32]}>
        <Col span={4}>
          <Card
            title='Saída total'
            content={numAbsCurrency(totalAmount, currency.code)}
            contentSize={32}
          />
        </Col>
        <Col span={4} offset={16}>
          <Card
            title='Mês'
            content={dayjs().format('MM/YYYY')}
            contentSize={32}
          />
        </Col>
        <Col span={16}>
          <CardPaymentSpend spend={spendEntries} payment={paymentEntries} />
        </Col>
        <Col span={8}>
          {!!grouppedByType.length && (
            <Card title='Gastos'>
              <Pie dataList={[grouppedByType]} currency={currency} />
            </Card>
          )}
        </Col>
        <Col span={16}>
          <CardByType data={entriesByMonth} currency={currency} />
        </Col>
        <Col span={8}>
          <CardByMonth data={spendEntries} currency={currency} />
        </Col>
      </Row>
    </div>
  )
}
