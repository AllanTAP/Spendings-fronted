'use client'
import { BsCurrencyExchange } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { map } from 'lodash'

import {
  CurrencyContext,
  currencyType,
  currencyTypes,
} from '@/app/ParentWrapper'
import { SET_CURRENCY } from '@/lib/mutations'

import styles from './navigation.module.scss'

export default function CurrencySelector() {
  const [setUserCurrency] = useMutation(SET_CURRENCY)

  return (
    <div className={styles.currency}>
      <CurrencyContext.Consumer>
        {({ setCurrency }) => {
          const items: MenuProps['items'] = map(
            currencyTypes,
            (ct: currencyType, key) => ({
              key: ct.code,
              label: (
                <div
                  onClick={() => {
                    setUserCurrency({ variables: { code: key } })
                    setCurrency(currencyTypes[key])
                  }}
                >
                  <div>{ct.currency}</div>
                  <div>{`${ct.code} - ${ct.symbol}`}</div>
                </div>
              ),
            })
          )

          return (
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              overlayClassName={styles.dropdown}
            >
              <BsCurrencyExchange />
            </Dropdown>
          )
        }}
      </CurrencyContext.Consumer>
    </div>
  )
}
