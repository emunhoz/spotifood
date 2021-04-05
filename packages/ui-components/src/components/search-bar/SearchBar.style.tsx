import styled, { css } from 'styled-components'

const ErrorStyle = css`
  border: 2px solid ${({ theme }) => theme.palette.negative};
`

export const SearchBar = styled.div`
  position: relative;
`

export const SearchIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: -webkit-fill-available;
  padding: 17px;
`

export const Input = styled.input<{ error?: boolean }>`
  width: -webkit-fill-available;
  padding: 20px 50px;
  font-family: 'Poppins', 'Helvetica Neue', sans-serif;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  letter-spacing: 0.75px;
  background: ${({ theme }) => theme.palette.light};
  border: none;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;

  ${({ error }) => error && ErrorStyle};
`

export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`
