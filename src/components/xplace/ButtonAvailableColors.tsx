import { type FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { ButtonAvailableColorItem } from './ButtonAvailableColorItem'

interface ButtonAvailableColorsProps {
  height: string
  selectedColor: string | undefined
  onNewColorSelected: (color: string) => void
  availableColors: string[]
}

export const ButtonAvailableColors: FC<ButtonAvailableColorsProps> = ({ selectedColor, height, onNewColorSelected, availableColors }) => {

  return (
    <Flex
      justify={'center'}
      alignItems={'center'}
      gap={'10px'}
      height={height}
      cursor={'pointer'}
      pointerEvents={'auto'}
    >
      {
        availableColors.map(color =>
          <ButtonAvailableColorItem
            key={color}
            isSelected={color === selectedColor}
            color={color}
            onClick={() => { onNewColorSelected(color) }}
          />
        )
      }
    </Flex>
  )
}
