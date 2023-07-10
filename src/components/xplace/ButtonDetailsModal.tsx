import { useEffect, useState, type FC } from 'react'
import { Box, Flex, Slide, Text } from '@chakra-ui/react'
import { PixelsApi } from '../../utils/xplaceClient'
import { ButtonAvailableColors } from './ButtonAvailableColors'
import { ChangePixelColorButton } from './ChangePixelColorButton'
import { type PixelAvailableColorsBo, type PixelInfosBo } from '../../xplace-client'

interface ButtonDetailsModalProps {
  selectedPixelProperties?: { x: number, y: number, color: string }
  onChangePixelClick: (x: number, y: number, selectedColor: string) => void
  availableColors: PixelAvailableColorsBo[]
}

export const ButtonDetailsModal: FC<ButtonDetailsModalProps> = ({ selectedPixelProperties, onChangePixelClick, availableColors }) => {
  const [pixelInfos, setPixelInfos] = useState<PixelInfosBo | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(selectedPixelProperties?.color)
  const fetchPixelInfos: () => Promise<void> = async () => {
    if (selectedPixelProperties !== undefined) {
      setPixelInfos(undefined)
      const infos = (await PixelsApi.pixelsControllerGetPixelInfos(selectedPixelProperties.x, selectedPixelProperties.y)).data

      setPixelInfos(infos)
    }
  }

  const handleNewSelectedColor: (color: string) => void = (color: string) => {
    setSelectedColor(color)
  }

  const handleChangePixelClick: () => void = () => {
    if (selectedPixelProperties === undefined || selectedColor === undefined) {
      return
    }

    onChangePixelClick(selectedPixelProperties.x, selectedPixelProperties.y, selectedColor)
  }

  useEffect(() => {
    void fetchPixelInfos()
    setSelectedColor(selectedPixelProperties?.color)
  }, [selectedPixelProperties])

  const isVisible = selectedPixelProperties !== undefined

  return (
    <Slide
      direction='bottom'
      in={isVisible}
    >
      <Flex
        flexDirection={'column'}
        justify={'center'}
        alignItems={'center'}
        height={'100%'}
        width={'100%'}
      >
        <Flex
          flexDirection={'column'}
          justify={'flex-start'}
          alignItems={'center'}
          height={'100%'}
          width={'70%'}
          borderRadius={'5px 5px 0 0'}
          gap={'50px'}
          backgroundColor={'rgba(0,0,0,0.1)'}
          backdropFilter='blur(10px)'
          pointerEvents={'auto'}
          cursor={'default'}
        >
          <Box flex={1}></Box>
          <ButtonAvailableColors
              selectedColor={selectedColor}
              height={'30px'}
              onNewColorSelected={handleNewSelectedColor}
              availableColors={availableColors.map(e => e.colorHex)}
          />
          <Text
              pointerEvents={'auto'}
              backgroundColor={'#000000'}
              textColor={'#ffffff'}
          >
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            {`pixelInfos x: ${selectedPixelProperties?.x} y: ${selectedPixelProperties?.y} priceToChange: ${pixelInfos?.priceToChange ?? 'loading...'}`}
          </Text>
          <ChangePixelColorButton onClick={handleChangePixelClick}/>
        </Flex>
      </Flex>
    </Slide>
  )
}
