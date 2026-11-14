import React, { type ButtonHTMLAttributes } from 'react'
import * as S from './Chip.style'

interface IChip extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  suggested?: boolean
}

export const Chip = ({ active = false, suggested = false, children, ...props }: IChip) => (
  <S.Chip type='button' aria-pressed={active} $active={active} {...props}>
    {children}
    {suggested && (
      <>
        <S.NowDot aria-hidden='true' />
        <S.VisuallyHidden>(suggested for now)</S.VisuallyHidden>
      </>
    )}
  </S.Chip>
)
