import styled, { css } from 'styled-components'

const ErrorStyle = css`
  border: 2px solid ${({ theme }) => theme.palette.negative};
`

const ErrorMessageStyle = css`
  color: ${({ theme }) => theme.palette.negative};
`

export const InputWrapper = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
`

export const Input = styled.input<{ error: boolean }>`
  width: -webkit-fill-available;
  height: 100%;
  min-height: 100%;
  max-height: 65px;
  padding: 20px;
  font-family: 'Poppins', 'Helvetica Neue', sans-serif;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  letter-spacing: 0.75px;
  background: ${({ theme }) => theme.palette.light};
  border: none;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  appearance: none;

  :focus {
    border-radius: none;
    outline: none;
  }

  :disabled {
    background: ${({ theme }) => theme.palette.lightest};
  }

  ${({ error }) => error && ErrorStyle};
`

export const HelpMessage = styled.span<{ error: boolean }>`
  float: left;
  color: ${({ theme }) => theme.palette.darkest};

  ${({ error }) => error && ErrorMessageStyle};
`
