import React from 'react'
import SearchIcon from './image/search.svg'
import * as S from './EmptyState.style'

interface IEmptyState {
  title?: string
  message?: string
}

export const EmptyState = ({ title = '', message = '' }: IEmptyState) => (
  <S.EmptyState>
    <S.EmptyStateImage src={SearchIcon} alt={title} />
    <S.EmptyStateTitle>{title}</S.EmptyStateTitle>
    <S.EmptyStateMessage>{message}</S.EmptyStateMessage>
  </S.EmptyState>
)
