import styled, { css } from 'styled-components'

export type Props = {
  isLoading: boolean
}
const defaultStyle = (animationDuration: number, borderColor: string) => css`
  border: 10px solid transparent;
  border-radius: 50%;
  border-top: 10px solid ${(p) => p.theme[borderColor]};
  border-left: 10px solid ${(p) => p.theme[borderColor]};
  border-right: 10px solid ${(p) => p.theme[borderColor]};
  position: absolute;
  -webkit-animation: spin ${animationDuration}s linear infinite; // Safari
  animation: spin ${animationDuration}s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    /* 20% { transform: rotate(320deg); } */
    100% {
      transform: rotate(360deg);
    }
  }
`

export const StyledLoader = styled.div`
  display: ${({ isLoading }: Props) => (isLoading ? 'inline-block' : 'none')};
  position: relative;
  opacity: 0.6;
`

export const OuterLoader = styled.div`
  ${defaultStyle(1.2, 'darkBlue')};
  width: 60px;
  height: 60px;
`

export const CenterLoader = styled.div`
  ${defaultStyle(2, 'normalBlue')};
  width: 36px;
  height: 36px;
  left: 12px;
  top: 12px;
  animation-direction: reverse;
`

export const InnerLoader = styled.div`
  ${defaultStyle(2, 'lightBlue')};
  width: 12px;
  height: 12px;
  left: 24px;
  top: 24px;
`
