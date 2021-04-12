import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Label } from '../../'
import * as S from './Input.style'

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
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
  label?: string
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

export const Input = ({
  value,
  placeholder,
  disabled,
  label,
  error,
  message = '',
  ...rest
}: InputTextProps) => (
  <S.InputWrapper>
    <Label value={label} htmlFor={label} />
    <S.Input
      id={label}
      name={label}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      error={!!error}
      {...rest}
    />
    <S.HelpMessage error={!!error}>{message}</S.HelpMessage>
  </S.InputWrapper>
)
