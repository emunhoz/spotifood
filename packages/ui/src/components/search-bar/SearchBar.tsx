import React, { ChangeEvent } from 'react'
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
   * Label for input
   */
  labelName?: string
  /**
   * onChange callback
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * State style when there is an error
   */
  error?: boolean
  /**
   * Message to help user
   */
  message?: string
}

export const SearchBar = ({
  value,
  placeholder,
  disabled,
  labelName,
  error,
  message = '',
  ...rest
}: ISearchBar) => (
  <S.SearchBar>
    <S.Label htmlFor={labelName}>{labelName}</S.Label>
    <S.SearchIcon>
      <img width='24' height='24' src={SearchIcon} alt='' />
    </S.SearchIcon>
    <S.Input
      type='text'
      id={labelName}
      name={labelName}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      error={!!error}
      {...rest}
    />
  </S.SearchBar>
)
