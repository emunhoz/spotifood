import styled from 'styled-components'

export const FilterButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 44px;

  button {
    margin-bottom: 40px;
  }
`

export const FilterButtonWrapperClear = styled.div`
  color: ${({ theme }) => theme.palette.primary};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const FilterWrapper = styled.form``
