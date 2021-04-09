import styled, { css } from 'styled-components'

export const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 26px;
  margin: 0 auto;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const SignOutLink = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  color: ${({ theme }) => theme.palette.primary};

  :hover {
    cursor: pointer;
  }
`

export const SpotifoodLogo = styled.img``

export const Wrapper = styled.div``
export const MainText = styled.div``
export const ImageWrapper = styled.div``

export const SpotifyLogo = styled.img`
  margin-bottom: 10px;
`

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 65px;
`

export const Filters = styled.div`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.75px;
`

export const PlayListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 3em;
  width: 100%;
  padding: 40px 0;
`

const SlideToLeft = css`
  right: 0;
`

export const CloseFilter = styled.div`
  margin-bottom: 20px;
`

export const FilterWrapper = styled.div`
  display: grid;
  align-content: space-between;
  max-width: 1280px;
  height: -webkit-fill-available;
  padding: 26px;
  margin: 0 auto;
`

export const FilterContent = styled.div<{ toogleFilter?: boolean }>`
  position: fixed;
  top: 0;
  right: -100%;
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffffe8;
  transition: 0.4s;

  select,
  input {
    width: -webkit-fill-available;
    padding: 18px;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #5a5a5a;
    box-shadow: none;
  }

  ${({ toogleFilter }) => toogleFilter && SlideToLeft}
`
