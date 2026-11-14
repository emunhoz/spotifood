import styled from 'styled-components'

export const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex: none;
  gap: 6px;
  align-items: center;
  padding: 10px 16px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme, $active }) => ($active ? theme.typography.weight.bold : theme.typography.weight.medium)};
  color: ${({ theme, $active }) => ($active ? theme.palette.onPrimary : theme.palette.textMuted)};
  white-space: nowrap;
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.palette.primary : theme.palette.surface)};
  border: 0;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  transition: background-color 0.2s, color 0.2s, transform 0.15s;

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.palette.onPrimary : theme.palette.darkest)};
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const NowDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.palette.brand};
  border-radius: 50%;
`

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
