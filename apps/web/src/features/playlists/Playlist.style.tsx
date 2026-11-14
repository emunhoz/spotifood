import styled from 'styled-components'

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
