import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const User = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  margin-left: 10px;
  border-radius: 100%;
`

export const NameWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  color: ${({ theme }) => theme.palette.darkest};
`

export const DisplayName = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`

export const SignOutLink = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const SpotifoodLogo = styled.img``
