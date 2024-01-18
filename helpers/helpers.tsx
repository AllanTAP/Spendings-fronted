export default function numAbsCurrency(value: number, currencyCode: string) {
  if (value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    })
  }
  return '--'
}
