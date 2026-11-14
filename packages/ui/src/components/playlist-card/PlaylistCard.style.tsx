import styled, { keyframes } from 'styled-components'

const MAX_STAGGERED_CARDS = 12

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
`

export const PlaylistCard = styled.article`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  gap: 14px;
  height: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.palette.surface};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.25s ease;

    /* backwards, not both: a filled end state would override the hover transform */
    animation: ${rise} 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
    animation-delay: calc(min(var(--i, 0), ${MAX_STAGGERED_CARDS}) * 40ms);

    img {
      transition: transform 0.4s ease;
    }

    &:hover,
    &:focus-within {
      transform: translateY(-4px);
    }

    &:hover img,
    &:focus-within img {
      transform: scale(1.04);
    }
  }
`

export const Cover = styled.figure`
  position: relative;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.default}px;
`

export const CoverImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Duration = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 4px 10px;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.palette.darkest};
  background: ${({ theme }) => theme.palette.lightest};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
`

export const Body = styled.div`
  display: flex;
  flex: 1;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 4px;
`

export const Info = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2px;
  min-width: 0;
`

export const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Stretched target: the title button's ::after covers the card, so the whole card opens it
export const OpenButton = styled.button`
  max-width: 100%;
  padding: 0;
  overflow: hidden;
  font: inherit;
  color: inherit;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: 0;

  &::after {
    position: absolute;
    inset: 0;
    content: '';
    border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }
`

export const Owner = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  color: ${({ theme }) => theme.palette.textMuted};
`

export const Pairs = styled.span`
  overflow: hidden;
  font-size: ${({ theme }) => theme.typography.size.s1}px;
  color: ${({ theme }) => theme.palette.textMuted};
  text-overflow: ellipsis;
  white-space: nowrap;

  strong {
    font-weight: ${({ theme }) => theme.typography.weight.medium};
    color: ${({ theme }) => theme.palette.darkest};
  }
`

export const Listen = styled.a`
  position: relative;
  z-index: 1;
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  color: ${({ theme }) => theme.palette.onPrimary};
  background: ${({ theme }) => theme.palette.primary};
  border-radius: 50%;
  transition: background-color 0.2s, transform 0.15s;

  &:hover {
    background: ${({ theme }) => theme.palette.primaryDark};
  }

  &:active {
    transform: scale(0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.brand};
    outline-offset: 2px;
  }
`
