import { ChangeEvent, useRef, useState } from 'react'
import { FetchResult } from '@apollo/client'
import { Button, Divider, Input, InputRef, Select, Space } from 'antd'

type AddNewItemType = (a: string) => Promise<FetchResult<boolean>>
interface SelectTypes {
  value: string
  onChange: (value: string) => void
  options: Array<string>
  addNewItem: AddNewItemType
}

export default function SelectWithAddBtn({
  value,
  onChange,
  options,
  addNewItem,
}: SelectTypes) {
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <Select
      showSearch
      value={value}
      onChange={onChange}
      options={options.map((entry: string) => ({
        label: entry,
        value: entry,
      }))}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder='Please enter item'
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
              type='text'
              icon={'+'}
              onClick={() => {
                addNewItem(name)
                return setName('')
              }}
            >
              Add item
            </Button>
          </Space>
        </>
      )}
    />
  )
}
