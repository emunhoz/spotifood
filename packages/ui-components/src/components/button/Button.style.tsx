import styled, { css } from 'styled-components'

const BlockStyle = css`
  display: block;
  width: 100%;
`

const NegativeStyle = css`
  color: ${({ theme }) => theme.palette.primary};
  background: ${({ theme }) => theme.palette.lightest};
  border: 2px solid ${({ theme }) => theme.palette.primary};
  :hover {
    color: ${({ theme }) => theme.palette.lightest};
    background: ${({ theme }) => theme.palette.primary};
  }
`

const GhostStyle = css`
  color: ${({ theme }) => theme.palette.primary};
  background: ${({ theme }) => theme.palette.lightest};
  :hover {
    color: ${({ theme }) => theme.palette.lightest};
    background: ${({ theme }) => theme.palette.primary};
  }
`

const SmallStyle = css`
  padding: 12px 40px;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
`

const BigStyle = css`
  padding: 24px 40px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
`

export const Button = styled.button<{ negative: boolean; ghost: boolean; size: string; block: boolean }>`
  min-width: 200px;
  padding: 18px 40px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.lightest};
  cursor: pointer;
  background: ${({ theme }) => theme.palette.primary};
  border: none;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.xbig}px;
  transition: 0.3s;

  :hover {
    background: ${({ theme }) => theme.palette.primaryDark};
  }

  :disabled {
    opacity: 0.5;
  }

  ${({ block }) => block && BlockStyle};

  ${({ negative }) => negative && NegativeStyle};
  ${({ ghost }) => ghost && GhostStyle};

  ${({ size }) => size === 'small' && SmallStyle};
  ${({ size }) => size === 'big' && BigStyle}
`
