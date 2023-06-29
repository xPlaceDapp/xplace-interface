import {FC} from "react"
import {Flex, Text} from "@chakra-ui/react"

interface ChangePixelColorButtonProps {
  onClick: () => void
}

export const ChangePixelColorButton: FC<ChangePixelColorButtonProps> = ({ onClick }) => {
  return (
    <Flex
      justify='center'
      alignItems='center'
      height='100%'
      width='100%'
      backgroundColor='#000000'
      cursor='pointer'
      pointerEvents='auto'
      onClick={onClick}
    >
      <Text>Change Color !</Text>
    </Flex>
  )
}
