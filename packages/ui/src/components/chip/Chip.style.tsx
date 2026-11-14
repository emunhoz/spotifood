import styled, { keyframes } from 'styled-components'

const ping = keyframes`
  to {
    box-shadow: 0 0 0 6px transparent;
  }
`

// Same weight active or not: a bolder active label would change the chip width and shove the row
export const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex: none;
  align-items: center;
  padding: 10px 16px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme, $active }) => ($active ? theme.palette.onPrimary : theme.palette.textMuted)};
  white-space: nowrap;
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.palette.primary : theme.palette.surface)};
  border: 0;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  transition: background-color 0.2s, color 0.25s, opacity 0.2s, transform 0.15s;

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

  &:disabled {
    cursor: default;
    opacity: 0.45;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

// Above a ChipGroup's sliding indicator, which sits between the chip background and its label
export const Content = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  gap: 6px;
  align-items: center;
`

// Two-digit slot, so a count going from 24 to 3 does not resize the chip and shift the row
export const Count = styled.span<{ $active: boolean }>`
  min-width: 1.3em;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  font-variant-numeric: tabular-nums;
  opacity: ${({ $active }) => ($active ? 0.75 : 1)};
`

export const NowDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.palette.brand};
  border-radius: 50%;

  /* Two pings on load to draw the eye once, then it stays quiet */
  @media (prefers-reduced-motion: no-preference) {
    box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.brand};
    animation: ${ping} 1.2s ease-out 0.6s 2;
  }
`

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
