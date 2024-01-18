'use client'

import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { ConfigProvider } from 'antd'
import ptBr from 'antd/locale/pt_BR'
import { useServerInsertedHTML } from 'next/navigation'
const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  const isServerInserted = React.useRef<boolean>(false)
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return
    }
    isServerInserted.current = true
    return (
      <style
        id='antd'
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    )
  })
  return (
    <ConfigProvider locale={ptBr}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  )
}

export default StyledComponentsRegistry
