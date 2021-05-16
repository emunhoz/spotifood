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
`

export const DisplayName = styled.span`
  margin-bottom: -5px;
`

export const SignOutLink = styled.span`
  font-size: ${({ theme }) => theme.typography.size.s3}px;
  color: ${({ theme }) => theme.palette.primary};

  :hover {
    cursor: pointer;
  }
`

export const SpotifoodLogo = styled.img``
