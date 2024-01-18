import { Select as SelectAntd } from 'antd'

interface SelectTypes {
  value: string
  onChange: (value: string) => void
  options: Array<string>
}

export default function Select({ value, onChange, options }: SelectTypes) {
  return (
    <SelectAntd
      value={value}
      onChange={onChange}
      options={options.map((entry: string) => ({
        label: entry,
        value: entry,
      }))}
    />
  )
}
