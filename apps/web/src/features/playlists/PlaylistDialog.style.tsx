import styled from 'styled-components'

export const Dialog = styled.dialog`
  box-sizing: border-box;
  width: min(520px, calc(100% - 32px));
  max-width: none;
  /* stylelint-disable-next-line unit-no-unknown -- dvh (Baseline 2023) tracks the mobile browser bar; this stylelint predates it */
  max-height: min(88dvh, 860px);
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  color: inherit;
  background: ${({ theme }) => theme.palette.lightest};
  border: 0;
  border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px;
  box-shadow: ${({ theme }) => theme.attributes.boxShadow.small};

  &::backdrop {
    background: color-mix(in srgb, ${({ theme }) => theme.palette.darkest} 55%, transparent);
    backdrop-filter: blur(4px);
  }

  /* Bottom sheet on phones: anchored to the bottom edge, rounded on top only */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
    /* stylelint-disable-next-line unit-no-unknown -- dvh (Baseline 2023) tracks the mobile browser bar; this stylelint predates it */
    max-height: 92dvh;
    margin: auto 0 0;
    border-radius: ${({ theme }) => theme.attributes.borderRadius.big}px ${({ theme }) => theme.attributes.borderRadius.big}px 0 0;
  }
`
