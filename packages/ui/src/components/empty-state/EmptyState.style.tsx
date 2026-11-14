import styled, { keyframes } from 'styled-components'

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${appear} 0.4s ease backwards;
  }
`

export const EmptyStateTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.m2}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.palette.darkest};
`

export const EmptyStateImage = styled.img`
  width: 100%;
  max-width: 200px;
`

export const EmptyStateMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  color: ${({ theme }) => theme.palette.textMuted};
`
