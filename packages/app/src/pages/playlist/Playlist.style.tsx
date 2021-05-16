import styled from 'styled-components'

export const Wrapper = styled.div``

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
