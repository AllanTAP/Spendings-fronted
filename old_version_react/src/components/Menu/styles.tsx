import styled from 'styled-components'

export const StyledMenu = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: center;
`

export const MenuOption = styled.div`
  background: #8e8e8e;
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }
`
