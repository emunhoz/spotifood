import styled, { css } from 'styled-components'

export const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 50px 38px;
  margin: 0 auto;
`

export const Logo = styled.div`
  margin-bottom: 20px;
`

export const SpotifoodLogo = styled.img``

export const Wrapper = styled.div``
export const MainText = styled.div``
export const ImageWrapper = styled.div``

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.typography.size.l1}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
`

export const Divider = styled.span`
  display: inline-block;
  width: 54px;
  height: 4px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
`

const TextStyle = css`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s4}px;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.darkest};
  letter-spacing: 0.3px;
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
  padding: 38px;
  text-align: center;
  background: ${({ theme }) => theme.palette.lighter};
  place-content: space-evenly;
`

export const ListenMusicImage = styled.img`
  position: fixed;
  bottom: 285px;
`

export const SpotifyLogo = styled.img`
  margin-bottom: 10px;
`

export const CallToActionText = styled.p`
  ${TextStyle};
  margin-bottom: 14px;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
`