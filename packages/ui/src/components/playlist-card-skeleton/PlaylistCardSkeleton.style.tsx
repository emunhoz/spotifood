import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  to {
    opacity: 0.55;
  }
`

// Mirrors PlaylistCard's box (padding 12, gap 14, square cover, 72px text block), so the grid
// does not grow when real cards replace it: that growth was the page's layout shift (CLS)
const CARD_TEXT_HEIGHT = 72

export const Skeleton = styled.div`
  display: flex;
  flex-flow: column;
  gap: 14px;
  padding: 12px;
  background: ${({ theme }) => theme.palette.surface};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
`

export const Block = styled.span<{ $height: string, $width?: string, $ratio?: boolean }>`
  display: block;
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height};
  aspect-ratio: ${({ $ratio }) => ($ratio ? '1' : 'auto')};
  background: ${({ theme }) => theme.palette.light};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.default}px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulse} 0.9s ease-in-out infinite alternate;
  }
`

export const Lines = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  gap: 8px;
  height: ${CARD_TEXT_HEIGHT}px;
  padding: 6px 4px;
`
