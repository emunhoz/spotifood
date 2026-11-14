import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
  text-transform: uppercase;
  letter-spacing: 0.75px;
`
