import styled, { css } from 'styled-components'

export const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 26px;
  margin: 0 auto;
`

export const Logo = styled.div`
  margin-bottom: 20px;
`

export const SpotifoodLogo = styled.img``

export const Wrapper = styled.div``
export const MainText = styled.div``
export const ImageWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 12em;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: block;
  }
`

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.typography.size.l1}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
`

export const Divider = styled.span`
  display: inline-block;
  width: 54px;
  height: 4px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
`

const TextStyle = css`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s4}px;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.darkest};
`

export const Paragraph = styled.p`
  ${TextStyle};
`

export const CallToAction = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 26px;
  text-align: center;
  background: ${({ theme }) => theme.palette.lighter};
  place-content: space-evenly;
`

export const ListenMusicImage = styled.img`
  width: 769px;
`

export const SpotifyLogo = styled.img`
  margin-bottom: 10px;
`

export const CallToActionText = styled.p`
  ${TextStyle};
  margin-bottom: 14px;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
`
