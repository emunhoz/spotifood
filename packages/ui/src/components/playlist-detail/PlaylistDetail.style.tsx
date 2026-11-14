import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
`

export const Detail = styled.article`
  display: flex;
  flex-flow: column;
  color: ${({ theme }) => theme.palette.darkest};
`

export const CoverWrap = styled.div`
  position: relative;
  padding: 12px 12px 0;
`

export const Cover = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
`

export const Close = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: ${({ theme }) => theme.palette.darkest};
  cursor: pointer;
  background: ${({ theme }) => theme.palette.lightest};
  border: 0;
  border-radius: 50%;
  transition: transform 0.2s;

  &:hover {
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 6px;
  padding: 20px 24px 24px;
`

export const Tags = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.brand};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.m3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  line-height: 1.2;
`

export const Meta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const Highlights = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 14px 0 6px;
`

export const Highlight = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.palette.surface};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.default}px;
`

export const HighlightLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const HighlightValue = styled.strong`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
`

export const SectionTitle = styled.h3`
  margin: 12px 0 4px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`

export const Tracks = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

export const Track = styled.li`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.light};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideIn} 0.4s ease backwards;
    animation-delay: calc(120ms + var(--i, 0) * 45ms);
  }
`

export const TrackNumber = styled.span`
  width: 20px;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.palette.textMuted};
  text-align: right;
`

export const TrackText = styled.span`
  display: flex;
  flex-flow: column;
  min-width: 0;
`

export const TrackTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`

export const TrackArtist = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const More = styled.p`
  margin: 8px 0 0;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const Listen = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 52px;
  margin-top: 18px;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.onPrimary};
  text-decoration: none;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  transition: background-color 0.2s, transform 0.15s;

  &:hover {
    background: ${({ theme }) => theme.palette.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }
`
