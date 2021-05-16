import styled, { css } from 'styled-components'

export const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 26px;
  margin: 0 auto;
`

export const Wrapper = styled.div``
export const MainText = styled.div``
export const ImageWrapper = styled.div``

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 65px;
  margin-bottom: 40px;
`

export const LabelWrapper = styled.div`
  margin-left: 10px;

  label {
    margin: 0;
  }
`

export const PlayListWrapper = styled.div`
  display: grid;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  grid-gap: 3em;
  width: 100%;
`

const SlideToLeft = css`
  right: 0;
`

export const CloseFilter = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 40px;
`

export const CloseIcon = styled.img`
  width: 44px;
  max-height: 44px;
  padding: 20px;
  background: ${({ theme }) => theme.palette.light};
  border-radius: 100%;
  opacity: 0.6;
  transition: all 300ms;
  transform: rotate(0);

  :hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`

export const FilterButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 44px;

  button {
    margin-bottom: 40px;
  }
`

export const FilterButtonWrapperClear = styled.div`
  color: ${({ theme }) => theme.palette.primary};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const FilterWrapper = styled.div`
  align-content: space-between;
  max-width: 1280px;
  height: -webkit-fill-available;
  padding: 26px;
  margin: 0 auto;
  overflow: scroll;
`

export const FilterContent = styled.div<{ toogleFilter?: boolean }>`
  position: fixed;
  top: 0;
  right: -100%;
  display: block;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: 0.4s;

  select,
  input {
    margin-bottom: 20px;
  }

  ${({ toogleFilter }) => toogleFilter && SlideToLeft}
`
