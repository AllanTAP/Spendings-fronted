import { useMutation } from '@apollo/client'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { currencyType } from '@/app/ParentWrapper'
import numAbsCurrency from '@/helpers/helpers'
import { DELETE_SPEND_ENTRY } from '@/lib/mutations'
import { GET_SPEND_ENTRIES } from '@/lib/queries'

interface EntryType {
  id: string
  createdAt: string
  date: string
  description: string
  spendType: string
  value: number
}

interface ResultsType {
  entries: Array<EntryType>
  currency: currencyType
  loadingGeneral: boolean
}

export default function Results({
  entries,
  currency,
  loadingGeneral,
}: ResultsType) {
  const [deleteEntry] = useMutation(DELETE_SPEND_ENTRY, {
    refetchQueries: [GET_SPEND_ENTRIES],
  })

  const dataSource =
    entries?.map((row: EntryType) => ({
      key: row.id,
      ...row,
    })) || []

  const columns: ColumnsType<EntryType> = [
    {
      title: 'Tipo',
      dataIndex: 'spendType',
      width: 20,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      width: 20,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      render: (vl: number) => numAbsCurrency(vl, currency.code),
      width: 20,
      sorter: (a: EntryType, b: EntryType) => a.value - b.value,
      align: 'right',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      render: (dt: string) => dayjs(dt).format('DD/MM/YYYY'),
      width: 20,
      sorter: (a: EntryType, b: EntryType) => dayjs(a.date).diff(dayjs(b.date)),
      defaultSortOrder: 'ascend',
      align: 'right',
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      render: (_: null, record: EntryType) => (
        <div>
          <Button
            danger
            onClick={() =>
              deleteEntry({
                variables: {
                  entryIndex: entries.findIndex((en) => en.id === record.id),
                },
              })
            }
          >
            Remover
          </Button>
        </div>
      ),
      width: 10,
      align: 'center',
    },
  ]

  return (
    <div className='results'>
      <Table
        size='small'
        columns={columns}
        dataSource={dataSource}
        loading={loadingGeneral}
        pagination={{
          defaultPageSize: 50,
        }}
      />
    </div>
  )
}
