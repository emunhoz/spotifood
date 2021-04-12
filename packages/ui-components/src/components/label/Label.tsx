import React from 'react'
import * as S from './Label.style'

interface ILabel {
  value?: string
  htmlFor?: string
}

export const Label = ({ value, ...rest }: ILabel) => (
  <S.Label {...rest}>{value}</S.Label>
)
