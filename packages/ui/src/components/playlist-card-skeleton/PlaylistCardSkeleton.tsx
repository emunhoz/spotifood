import React from 'react'
import * as S from './PlaylistCardSkeleton.style'

// Same footprint as PlaylistCard, so swapping it for real cards causes no layout shift.
export const PlaylistCardSkeleton = () => (
  <S.Skeleton aria-hidden='true'>
    <S.Block $height='auto' $ratio />
    <S.Block $height='16px' $width='70%' />
    <S.Block $height='12px' $width='45%' />
  </S.Skeleton>
)
