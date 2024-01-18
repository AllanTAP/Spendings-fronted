import classNames from 'classnames'

import style from './card.module.scss'

interface CardType {
  title?: string | React.ReactElement
  content?: string
  contentSize?: 14 | 20 | 24 | 28 | 32
  children?: React.ReactElement
  filter?: React.ReactElement
}

export default function Card({
  title,
  content,
  contentSize,
  children,
  filter,
}: CardType) {
  return (
    <div>
      <div className={style.card}>
        <div className={style.title}>{title}</div>
        {filter && <div className={style.filter}>{filter}</div>}
        <div
          className={
            contentSize
              ? classNames(style.content, style[`content-fz${contentSize}`])
              : style.content
          }
        >
          {content || children}
        </div>
      </div>
    </div>
  )
}
