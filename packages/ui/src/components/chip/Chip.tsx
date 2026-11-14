import React, { type ButtonHTMLAttributes } from 'react'
import * as S from './Chip.style'

interface IChip extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  suggested?: boolean
  /** Results this chip would show if picked; 0 disables it unless it is the active one */
  count?: number
}

export const Chip = ({ active = false, suggested = false, count, children, disabled, ...props }: IChip) => {
  // An active chip must stay clickable even at 0, or the user could not unset it
  const isEmpty = count === 0 && !active

  return (
    <S.Chip type='button' aria-pressed={active} $active={active} disabled={Boolean(disabled) || isEmpty} {...props}>
      <S.Content>
        {children}
        {count !== undefined && <S.Count $active={active}>{count}</S.Count>}
        {suggested && (
          <>
            <S.NowDot aria-hidden='true' />
            <S.VisuallyHidden>(suggested for now)</S.VisuallyHidden>
          </>
        )}
      </S.Content>
    </S.Chip>
  )
}
