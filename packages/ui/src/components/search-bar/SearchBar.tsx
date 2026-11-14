import React, { forwardRef, type ChangeEvent, type KeyboardEvent } from 'react'
import SearchIcon from './search-icon.svg'
import * as S from './SearchBar.style'

export interface ISearchBar {
  disabled?: boolean
  /**
   * Input value
   */
  value?: string
  /**
   * Placeholder for input
   */
  placeholder?: string
  /**
   * Accessible label (visually hidden)
   */
  labelName?: string
  /**
   * onChange callback
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * Shows a clear button while there is text; Escape also calls it
   */
  onClear?: () => void
  /**
   * Keyboard shortcut shown in the empty field on pointer devices, e.g. "/"
   */
  shortcutHint?: string
  /**
   * State style when there is an error
   */
  error?: boolean
  /**
   * Message to help user
   */
  message?: string
}

export const SearchBar = forwardRef<HTMLInputElement, ISearchBar>(({
  value,
  placeholder,
  disabled,
  labelName,
  error,
  message = '',
  onClear,
  shortcutHint,
  ...rest
}, ref) => {
  const hasText = Boolean(value)

  function handleKeyDown (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Escape' || !hasText) return
    event.preventDefault()
    onClear?.()
  }

  return (
    // The label wraps the input, so the association needs no id (and clicking the icon focuses it)
    <S.SearchBar>
      <S.Label>{labelName}</S.Label>
      <S.SearchIcon>
        <img width='20' height='20' src={SearchIcon} alt='' />
      </S.SearchIcon>
      <S.Input
        ref={ref}
        type='text'
        name={labelName}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        error={!!error}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {hasText && onClear && (
        <S.ClearButton type='button' aria-label='Clear search' onClick={onClear}>
          <svg width='14' height='14' viewBox='0 0 14 14' aria-hidden='true'>
            <path d='M2 2l10 10M12 2L2 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </S.ClearButton>
      )}
      {!hasText && shortcutHint && <S.Shortcut aria-hidden='true'>{shortcutHint}</S.Shortcut>}
    </S.SearchBar>
  )
})

SearchBar.displayName = 'SearchBar'
