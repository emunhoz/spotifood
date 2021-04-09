import React from 'react'
import * as S from './PlaylistCard.style'

interface IPlaylistCard {
  imgUrl: string
  playlistName?: string
  owner?: string
  link?: string
}

export const PlaylistCard = ({
  imgUrl,
  playlistName,
  owner,
  link
}: IPlaylistCard) => (
  <S.PlaylistCard>
    <S.PlaylistCardFigure>
      <S.PlaylistCardImg src={imgUrl} alt='image name' />
    </S.PlaylistCardFigure>
    <S.Footer>
      <S.PlaylistInfo>
        <S.PlaylistInfoTitle>{playlistName}</S.PlaylistInfoTitle>
        <S.PlaylistInfoSubtitle>por {owner}</S.PlaylistInfoSubtitle>
      </S.PlaylistInfo>
      <S.Link href={link} rel='noreferrer' target='_blank'>
        Escutar
      </S.Link>
    </S.Footer>
  </S.PlaylistCard>
)
