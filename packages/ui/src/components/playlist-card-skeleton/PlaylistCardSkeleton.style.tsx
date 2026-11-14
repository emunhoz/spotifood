import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  to {
    opacity: 0.55;
  }
`

export const Skeleton = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  padding: 12px 12px 18px;
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
