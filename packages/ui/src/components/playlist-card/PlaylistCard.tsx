import React, { type CSSProperties } from 'react'
import * as S from './PlaylistCard.style'

interface IPlaylistCard {
  imgUrl: string
  playlistName?: string
  owner?: string
  link?: string
  minutes?: number
  pairsWith?: string
  index?: number
  /** Makes the whole card open the playlist; the Listen link stays a separate target */
  onOpen?: () => void
  /** Lets the app name the cover for a shared-element view transition */
  coverStyle?: CSSProperties
  /** Lets the app name the whole card, so it can morph into another surface */
  shellStyle?: CSSProperties
}

const MINUTES_PER_HOUR = 60
// Covers in the first screen load eagerly: lazy-loading them delayed the LCP image
const EAGER_COVERS = 8

export function formatDuration (minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR)
  const rest = minutes % MINUTES_PER_HOUR
  if (hours === 0) return `${rest} min`
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}

export const PlaylistCard = ({ imgUrl, playlistName, owner, link, minutes, pairsWith, index = 0, onOpen, coverStyle, shellStyle }: IPlaylistCard) => (
  <S.PlaylistCard style={{ '--i': index, ...shellStyle } as CSSProperties}>
    <S.Cover>
      {/* The name goes on the image, not the figure, so the duration badge stays in the card */}
      <S.CoverImg src={imgUrl} alt='' loading={index < EAGER_COVERS ? 'eager' : 'lazy'} style={coverStyle} />
      {minutes !== undefined && <S.Duration>{formatDuration(minutes)}</S.Duration>}
    </S.Cover>
    <S.Body>
      <S.Info>
        <S.Title>
          {onOpen ? <S.OpenButton type='button' onClick={onOpen}>{playlistName}</S.OpenButton> : playlistName}
        </S.Title>
        <S.Owner>by {owner}</S.Owner>
        {pairsWith && <S.Pairs>Pairs with <strong>{pairsWith}</strong></S.Pairs>}
      </S.Info>
      <S.Listen href={link} rel='noreferrer' target='_blank' aria-label={`Listen to ${playlistName} on Spotify`}>
        <svg width='18' height='18' viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z' fill='currentColor' />
        </svg>
      </S.Listen>
    </S.Body>
  </S.PlaylistCard>
)
