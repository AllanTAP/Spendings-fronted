import { StyledLoader, OuterLoader, CenterLoader, InnerLoader } from './styles'

type Props = {
  isLoading: boolean
}

const Loader = ({ isLoading }: Props) => {
  return (
    <StyledLoader isLoading={isLoading}>
      <OuterLoader />
      <CenterLoader />
      <InnerLoader />
    </StyledLoader>
  )
}

export default Loader
