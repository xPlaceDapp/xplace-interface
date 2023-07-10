import { type FC } from 'react'
import { Box } from '@chakra-ui/react'

interface ButtonAvailableColorItemProps {
  isSelected: boolean
  color: string
  onClick: (color: string) => void
}

export const ButtonAvailableColorItem: FC<ButtonAvailableColorItemProps> = ({ isSelected, color, onClick }) => {
  const borderWidth = isSelected ? '2px' : '0px'

  return (
    <Box
      height={'100%'}
      aspectRatio={1}
      backgroundColor={color}
      borderRadius={'5px'}
      borderColor={'xplace.mainColor'}
      borderWidth={borderWidth}
      borderStyle={'solid'}
      onClick={() => { onClick(color) }}
    />
  )
}
