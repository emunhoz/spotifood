import styled from 'styled-components'

export const PlaylistCard = styled.div`
  display: flex;
  flex-flow: column;
  box-shadow: 0 6px 38px 10px rgba(0, 0, 0, 0.06);
`

export const PlaylistCardFigure = styled.figure`
  display: flex;
  width: 100%;
  margin: 0;
`

export const PlaylistCardImg = styled.img`
  width: inherit;
  height: 100%;
  border-top-left-radius: ${({ theme }) =>
    theme.attributes.borderRadius.default}px;
  border-top-right-radius: ${({ theme }) =>
    theme.attributes.borderRadius.default}px;
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom-right-radius: ${({ theme }) =>
    theme.attributes.borderRadius.default}px;
  border-bottom-left-radius: ${({ theme }) =>
    theme.attributes.borderRadius.default}px;
`

export const PlaylistInfo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

export const PlaylistInfoTitle = styled.h6`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
`

export const PlaylistInfoSubtitle = styled.small`
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.palette.darkest};
  letter-spacing: 0.75px;
`

export const Link = styled.a`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};
`
