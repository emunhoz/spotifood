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

export const AppliedFilters = styled.div`
  display: flex;
  flex-flow: column;
  margin: 20px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-flow: inherit;
    align-items: center;
  }
`

export const AppliedFiltersTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.palette.darkest};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: 10px;
    margin-bottom: 0;
  }
`

export const AppliedFilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: 10px;
    margin-bottom: 0;
  }
`

export const AppliedFilter = styled.div`
  padding: 10px;
  margin: 6px;
  margin-left: 0%;
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  color: ${({ theme }) => theme.palette.darkest};
  background: ${({ theme }) => theme.palette.lightest};
  border: 1px solid ${({ theme }) => theme.palette.light};
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: 20px;
  }

  &:hover {
    text-decoration: line-through;
    cursor: pointer;
    background: ${({ theme }) => theme.palette.light};
  }
`
