import styled, { keyframes } from 'styled-components'

// Scroll range (px) over which the toolbar gains its edge: roughly when it reaches the top and sticks.
// ponytail: fixed range, swap for a view-timeline on the hero if the hero height starts to vary a lot
const LIFT_START = 160
const LIFT_END = 240

const lift = keyframes`
  to {
    box-shadow: 0 1px 0 var(--toolbar-edge), 0 16px 28px -22px var(--toolbar-shadow);
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  min-width: 0;
`

export const Hero = styled.section`
  display: flex;
  flex-flow: column;
  gap: 6px;
  margin-top: 16px;
`

export const Eyebrow = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.palette.textMuted};
`

export const Count = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.m3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
  color: ${({ theme }) => theme.palette.darkest};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${({ theme }) => theme.typography.size.l2}px;
  }
`

export const Subline = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  flex-flow: column;
  gap: 12px;
  padding: 12px 26px;
  margin: -12px -26px 0;
  background: color-mix(in srgb, ${({ theme }) => theme.palette.lightest} 88%, transparent);
  backdrop-filter: blur(12px) saturate(1.4);

  --toolbar-edge: ${({ theme }) => theme.palette.light};
  --toolbar-shadow: color-mix(in srgb, ${({ theme }) => theme.palette.darkest} 40%, transparent);

  /* Scroll-driven: the edge fades in as the page scrolls, no scroll listener. Unsupported browsers keep a flat bar. */
  @supports (animation-timeline: scroll()) {
    animation: ${lift} linear both;
    /* stylelint-disable-next-line property-no-unknown -- scroll-driven animations postdate this stylelint */
    animation-timeline: scroll();
    /* stylelint-disable-next-line property-no-unknown -- scroll-driven animations postdate this stylelint */
    animation-range: ${LIFT_START}px ${LIFT_END}px;
  }
`

export const Filters = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
  min-width: 0;
`

export const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 2px 2px 6px;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
`

export const ClearButton = styled.button`
  align-self: flex-start;
  padding: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.brand};
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: 0;

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`

export const CardSlot = styled.div`
  min-width: 0;
`
