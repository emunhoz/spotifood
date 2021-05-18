import React from 'react'
import CloseIcon from './img/close-icon.svg'
import * as S from './SideModal.style'

interface ISideModal {
  show: boolean
  close: () => void
  children: React.ReactChild
}

export const SideModal = ({ show, children, close }: ISideModal) => {
  return (
    <S.ModalContent toogleFilter={show}>
      <S.ModalWrapper>
        <S.CloseModal onClick={() => close()}>
          <S.CloseIcon src={CloseIcon} alt='Fechar' width='44' height='44' />
          Fechar
        </S.CloseModal>
        {children}
      </S.ModalWrapper>
    </S.ModalContent>
  )
}
