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
`

export const Input = styled.input<{ error: boolean; }>`
  box-sizing: border-box;
  min-width: 100%;
  height: 52px;
  padding: 18px;
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.palette.darkest};
  background: ${({ theme }) => theme.palette.lightest};
  border: 2px solid ${({ theme }) => theme.palette.darkest};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.small}px;
  transition: all .3s linear;
  -webkit-appearance: none;

  :focus {
    border-radius: none;
    outline: none;
  }

  :disabled {
    background: ${({ theme }) => theme.palette.lightest};
  }

  ${({ error }) => error && ErrorStyle};
`

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.palette.darkest};
`

export const HelpMessage = styled.span<{ error: boolean }>`
  float: left;
  color: ${({ theme }) => theme.palette.darkest};

  ${({ error }) => error && ErrorMessageStyle};
`
