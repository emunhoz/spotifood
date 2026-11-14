import React, { type CSSProperties } from 'react'
import { formatDuration } from '../playlist-card/PlaylistCard'
import * as S from './PlaylistDetail.style'

interface ITrack {
  title: string
  artist: string
}

interface IPlaylistDetail {
  imgUrl: string
  name: string
  owner: string
  minutes: number
  trackCount: number
  pairsWith: string
  mood: string
  tags: string[]
  tracklist: ITrack[]
  listenUrl: string
  onClose: () => void
  /** Lets the app name the cover for a shared-element view transition */
  coverStyle?: CSSProperties
}

export const PlaylistDetail = ({
  imgUrl,
  name,
  owner,
  minutes,
  trackCount,
  pairsWith,
  mood,
  tags,
  tracklist,
  listenUrl,
  onClose,
  coverStyle
}: IPlaylistDetail) => {
  const moreTracks = trackCount - tracklist.length

  return (
    <S.Detail>
      <S.CoverWrap>
        <S.Cover src={imgUrl} alt='' style={coverStyle} />
        <S.Close type='button' aria-label='Close' onClick={onClose}>
          <svg width='14' height='14' viewBox='0 0 14 14' aria-hidden='true'>
            <path d='M2 2l10 10M12 2L2 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </S.Close>
      </S.CoverWrap>

      <S.Body>
        <S.Tags>{tags.join(' · ')}</S.Tags>
        <S.Title>{name}</S.Title>
        <S.Meta>by {owner} · {trackCount} tracks · {formatDuration(minutes)}</S.Meta>

        <S.Highlights>
          <S.Highlight>
            <S.HighlightLabel>Pairs with</S.HighlightLabel>
            <S.HighlightValue>{pairsWith}</S.HighlightValue>
          </S.Highlight>
          <S.Highlight>
            <S.HighlightLabel>Mood</S.HighlightLabel>
            <S.HighlightValue>{mood}</S.HighlightValue>
          </S.Highlight>
        </S.Highlights>

        <S.SectionTitle>Tracklist</S.SectionTitle>
        <S.Tracks>
          {tracklist.map((track, index) => (
            <S.Track key={`${track.title}-${track.artist}`} style={{ '--i': index } as CSSProperties}>
              <S.TrackNumber aria-hidden='true'>{index + 1}</S.TrackNumber>
              <S.TrackText>
                <S.TrackTitle>{track.title}</S.TrackTitle>
                <S.TrackArtist>{track.artist}</S.TrackArtist>
              </S.TrackText>
            </S.Track>
          ))}
        </S.Tracks>
        {moreTracks > 0 && <S.More>+ {moreTracks} more tracks</S.More>}

        <S.Listen href={listenUrl} target='_blank' rel='noreferrer'>
          <svg width='18' height='18' viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z' fill='currentColor' />
          </svg>
          Listen on Spotify
        </S.Listen>
      </S.Body>
    </S.Detail>
  )
}
