'use client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  DatePicker,
  Form as FormAnt,
  Input,
  InputNumber,
  message,
} from 'antd'
import dayjs from 'dayjs'

import SelectWithAddBtn from '@/components/Select/SelectWithAddBtn'
import { SET_SPEND_ENTRY, SET_SPEND_TYPE } from '@/lib/mutations'
import { GET_SPEND_ENTRIES } from '@/lib/queries'

type FieldType = {
  description: string
  type?: string
  value?: string
  date?: string
}

interface FormType {
  loadingGeneral: boolean
  spendTypes: Array<string>
}

export default function Form({ loadingGeneral, spendTypes }: FormType) {
  const [type, setType] = useState('')
  const [setEntry] = useMutation(SET_SPEND_ENTRY, {
    refetchQueries: [GET_SPEND_ENTRIES],
  })

  const [setSpendType] = useMutation(SET_SPEND_TYPE, {
    refetchQueries: [GET_SPEND_ENTRIES],
  })

  const onFinish = (values: FieldType) => {
    if (type !== '') {
      setEntry({
        variables: {
          type: type.toString(),
          value: values.value,
          date: values.date,
          description: values.description,
        },
      })
    }
  }

  const onFinishFailed = () => {
    message.error('Um erro aconteceu =(')
  }

  const { Item } = FormAnt

  return (
    <div className='filter'>
      <FormAnt
        className='form'
        name='create-entry'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          type: spendTypes && spendTypes[0],
          value: 10.23,
          date: dayjs(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Item<FieldType>
          label='Tipo'
          name='type'
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <SelectWithAddBtn
            value={type}
            onChange={(value: string) => setType(value)}
            options={spendTypes}
            addNewItem={(name) => setSpendType({ variables: { name: name } })}
          />
        </Item>
        <Item<FieldType> label='Descrição' name='description'>
          <Input />
        </Item>
        <Item<FieldType>
          label='Valor'
          name='value'
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <InputNumber />
        </Item>

        <Item<FieldType> label='Data' name='date' rules={[{ required: true }]}>
          <DatePicker format={'DD/MM/YYYY'} />
        </Item>

        <Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type='primary' htmlType='submit' disabled={loadingGeneral}>
            Enviar
          </Button>
        </Item>
      </FormAnt>
    </div>
  )
}
