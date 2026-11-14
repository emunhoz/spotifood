import styled, { css } from 'styled-components'

const ErrorStyle = css`
  border: 2px solid ${({ theme }) => theme.palette.negative};
`

// Sized by its own padding, not by the parent: it must hold up in any layout.
export const SearchBar = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  display: flex;
  pointer-events: none;
  transform: translateY(-50%);
`

export const Input = styled.input<{ error?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 18px 20px 18px 58px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  color: ${({ theme }) => theme.palette.darkest};
  background: ${({ theme }) => theme.palette.surface};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.palette.textMuted};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.palette.brand};
  }

  ${({ error }) => error && ErrorStyle};
`

export const Label = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`
