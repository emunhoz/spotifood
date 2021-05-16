import React from 'react'
import { render, fireEvent, screen } from '../../utils/test-utils'
import { Header } from './Header'

describe('[Component]: Header', () => {
  test('render the component', () => {
    const { asFragment } = render(
      <Header
        signOut={() => console.log('sair')}
        user={{
          display_name: 'Eder',
          images: [
            {
              url:
                'https://i.scdn.co/image/ab6775700000ee85ffd83d8fd3711add44d62317'
            }
          ]
        }}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render the component without user info', () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('trigger function to logout user', () => {
    const SignOut = jest.fn()

    render(
      <Header
        signOut={SignOut}
        user={{
          display_name: 'Eder',
          images: [
            {
              url:
                'https://i.scdn.co/image/ab6775700000ee85ffd83d8fd3711add44d62317'
            }
          ]
        }}
      />
    )

    fireEvent.click(screen.getByText(/sair/i))

    expect(SignOut).toHaveBeenCalled()
  })
})
