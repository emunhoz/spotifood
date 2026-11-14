import styled from 'styled-components'

export const SelectInputWrapper = styled.div``

export const SelectInput = styled.select`
  position: relative;
  width: -webkit-fill-available;
  height: 100%;
  max-height: 65px;
  padding: 20px;
  font-family: 'Poppins', 'Helvetica Neue', sans-serif;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  letter-spacing: 0.75px;
  background: ${({ theme }) => theme.palette.light};
  border: none;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  transition: all 0.3s linear;
  appearance: none;

  :focus {
    border-radius: none;
    outline: none;
  }

  :disabled {
    background: ${({ theme }) => theme.palette.lightest};
  }
`

export const Label = styled.div`
  text-align: left;
`
