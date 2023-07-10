import { type FC } from 'react'
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks'
import { logout } from '@multiversx/sdk-dapp/utils'
import { routeNames } from '../../routes'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const NavBar: FC = () => {
  const navigate = useNavigate()
  const isLoggedIn = useGetIsLoggedIn()

  const handleClickOnLoginButton: () => void = () => {
    if (isLoggedIn) {
      void logout(routeNames.game)
    } else {
      navigate(routeNames.unlock)
    }
  }

  return (
        <Flex
            position={'absolute'}
            justify={'flex-end'}
            alignItems={'flex-start'}
            height={'100%'}
            width={'100%'}
            pointerEvents={'none'}
        >
            <Box
                flex={1}
            />
            <Button
                pointerEvents={'auto'}
                onClick={handleClickOnLoginButton}
            >
                { isLoggedIn ? 'Logout' : 'Login' }
            </Button>
        </Flex>
  )
}
