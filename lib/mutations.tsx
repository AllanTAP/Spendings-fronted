import { gql } from '@apollo/client'

export const SET_CURRENCY = gql`
  mutation setUserCurrency($code: CurrencyCode!) {
    setUserCurrency(code: $code)
  }
`

export const SET_SPEND_TYPE = gql`
  mutation setSpendType($name: String!) {
    setSpendType(name: $name)
  }
`

export const SET_SPEND_ENTRY = gql`
  mutation setSpendEntry(
    $type: String!
    $value: Float!
    $description: String
    $date: String
  ) {
    setSpendEntry(
      type: $type
      value: $value
      description: $description
      date: $date
    )
  }
`

export const DELETE_SPEND_ENTRY = gql`
  mutation deleteSpendEntry($entryIndex: Int!) {
    deleteSpendEntry(entryIndex: $entryIndex)
  }
`

export const SET_PAYMENT_TYPE = gql`
  mutation setPaymentType($name: String!) {
    setPaymentType(name: $name)
  }
`

export const SET_PAYMENT_ENTRY = gql`
  mutation setPaymentEntry(
    $type: String!
    $value: Float!
    $description: String
    $date: String
  ) {
    setPaymentEntry(
      type: $type
      value: $value
      description: $description
      date: $date
    )
  }
`

export const DELETE_PAYMENT_ENTRY = gql`
  mutation deletePaymentEntry($entryIndex: Int!) {
    deletePaymentEntry(entryIndex: $entryIndex)
  }
`
