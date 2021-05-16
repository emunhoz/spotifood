import React from 'react'
import logo from './img/spotifood-logo.svg'
import * as S from './Header.style'

interface IHeader {
  user?: {
    // eslint-disable-next-line camelcase
    display_name: string
    images: [
      {
        url: string
      }
    ]
  }
  signOut?: () => void
}

export const Header = ({ user, signOut }: IHeader) => (
  <S.Header>
    <S.SpotifoodLogo src={logo} alt='Logo' width='124' height='45' />
    {user && (
      <S.User>
        <S.NameWrapper>
          <S.DisplayName>{user.display_name}</S.DisplayName>
          <S.SignOutLink onClick={() => signOut?.()}>Sair</S.SignOutLink>
        </S.NameWrapper>
        <S.Avatar src={user.images[0].url} alt={user.display_name} />
      </S.User>
    )}
  </S.Header>
)
