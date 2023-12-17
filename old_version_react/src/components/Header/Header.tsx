import { StyledHeader } from './styles'

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const Header = ({ children }: Props) => {
  return (
    <>
      <StyledHeader>{children}</StyledHeader>
    </>
  )
}

export default Header
