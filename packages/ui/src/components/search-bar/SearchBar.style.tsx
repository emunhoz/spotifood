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
  left: 18px;
  display: flex;
  pointer-events: none;
  transform: translateY(-50%);
`

export const Input = styled.input<{ error?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  padding: 0 52px 0 50px;
  margin: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  line-height: normal;
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

export const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: ${({ theme }) => theme.palette.textMuted};
  cursor: pointer;
  background: ${({ theme }) => theme.palette.light};
  border: 0;
  border-radius: 50%;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.palette.darkest};
    background: ${({ theme }) => theme.palette.mediumlight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }
`

export const Shortcut = styled.kbd`
  position: absolute;
  right: 14px;
  display: none;
  min-width: 22px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  color: ${({ theme }) => theme.palette.textMuted};
  text-align: center;
  pointer-events: none;
  border: 1px solid ${({ theme }) => theme.palette.mediumlight};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.small}px;

  /* Only where a keyboard is likely: no shortcut hint on touch screens */
  @media (pointer: fine) {
    display: block;
  }
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
