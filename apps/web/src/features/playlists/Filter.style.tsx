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

export const FilterButtonWrapperClear = styled.button`
  padding: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s4}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
  text-decoration: underline;
  background: none;
  border: 0;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const FilterWrapper = styled.form``
