import styled from 'styled-components'

export const Row = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  gap: 8px;
  padding: 2px 2px 6px;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;

  /* The indicator paints the active fill, so the pressed chip itself stays transparent */
  & > [aria-pressed='true'] {
    background: transparent;
  }
`

// Positioned at z-index 0: above the chips' own (non-positioned) backgrounds, below their labels (z-index 1)
export const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), width 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.2s ease;

  &[data-visible='true'] {
    opacity: 1;
  }

  &[data-instant='true'] {
    transition: opacity 0.2s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
