import React, { ChangeEvent } from 'react'
import { Label } from '../../'
import * as S from './SelectInput.style'

interface ISelectInput {
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
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  /**
   * Children options tag
   */
  children?: React.ReactNode
}

export const SelectInput = ({
  value,
  onChange,
  placeholder,
  disabled,
  label = '',
  children,
  ...rest
}: ISelectInput) => (
  <S.SelectInputWrapper>
    <S.Label>
      <Label htmlFor={label} value={label} />
      <S.SelectInput name={label} value={value} onChange={onChange} {...rest}>
        {children}
      </S.SelectInput>
    </S.Label>
  </S.SelectInputWrapper>
)
