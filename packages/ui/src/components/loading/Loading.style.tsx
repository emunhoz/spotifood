import styled from 'styled-components'

export const Loading = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid ${({ theme }) => theme.palette.light};
    border-left-color: ${({ theme }) => theme.palette.primary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
`
