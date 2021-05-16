import styled, { css } from 'styled-components'

const SlideToLeft = css`
  right: 0;
`

export const ModalContent = styled.div<{ toogleFilter?: boolean }>`
  position: fixed;
  top: 0;
  right: -100%;
  display: block;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.lightest};
  transition: 0.4s;

  select,
  input {
    margin-bottom: 20px;
  }

  ${({ toogleFilter }) => toogleFilter && SlideToLeft}
`

export const CloseModal = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 40px;
`

export const CloseIcon = styled.img`
  height: 44px;
  padding: 14px;
  background: ${({ theme }) => theme.palette.light};
  border-radius: 100%;
  opacity: 0.6;
  transition: all 300ms;
  transform: rotate(0);

  :hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`

export const ModalWrapper = styled.div`
  align-content: space-between;
  max-width: 1280px;
  height: -webkit-fill-available;
  padding: 26px;
  margin: 0 auto;
  overflow: scroll;
`
