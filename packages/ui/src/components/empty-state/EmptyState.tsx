import React, { type ReactNode } from 'react'
import SearchIcon from './image/search.svg'
import * as S from './EmptyState.style'

interface IEmptyState {
  title?: string
  message?: string
  action?: ReactNode
}

export const EmptyState = ({ title = '', message = '', action }: IEmptyState) => (
  <S.EmptyState>
    <S.EmptyStateImage src={SearchIcon} alt='' />
    <S.EmptyStateTitle>{title}</S.EmptyStateTitle>
    <S.EmptyStateMessage>{message}</S.EmptyStateMessage>
    {action}
  </S.EmptyState>
)
