import { StyledContent } from './styles'

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const Content = ({ children }: Props) => {
  return <StyledContent>{children}</StyledContent>
}

export default Content
