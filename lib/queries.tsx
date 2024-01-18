import { gql } from '@apollo/client'

export const GET_CURRENCY = gql`
  query userCurrency {
    getUserCurrency
  }
`

export const GET_SPEND_ENTRIES = gql`
  query spendEntries {
    getSpendEntries {
      spendTypes
      entries {
        id
        createdAt
        date
        description
        spendType
        value
      }
    }
  }
`

export const GET_PAYMENT_ENTRIES = gql`
  query paymentEntries {
    getPaymentEntries {
      paymentTypes
      paymentEntries {
        id
        createdAt
        date
        description
        paymentType
        value
      }
    }
  }
`
