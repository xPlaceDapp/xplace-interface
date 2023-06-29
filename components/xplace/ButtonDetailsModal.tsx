import {FC, useEffect, useState} from "react"
import {Box, Flex, Slide, Text} from "@chakra-ui/react"
import {PixelsApi} from "../../utils/xplaceClient"
import {PixelInfosBo} from "../../xplace-client"
import {ButtonAvailableColors} from "./ButtonAvailableColors"
import {ChangePixelColorButton} from "./ChangePixelColorButton"

interface ButtonDetailsModalProps {
  selectedPixelProperties?: { x: number, y: number, color: string },
  onChangePixelClick: (x: number, y: number, selectedColor: string) => void
}

export const ButtonDetailsModal: FC<ButtonDetailsModalProps> = ({ selectedPixelProperties, onChangePixelClick }) => {
  const [pixelInfos, setPixelInfos] = useState<PixelInfosBo | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(selectedPixelProperties?.color)
  const fetchPixelInfos = async () => {
    if (pixelInfos === undefined) {
      return
    } else {
      setPixelInfos(undefined)
      const infos = (await PixelsApi.pixelsControllerGetPixelInfos(pixelInfos.x, pixelInfos.y)).data

      setPixelInfos(infos)
    }
  }

  const handleNewSelectedColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleChangePixelClick = () => {
    if (selectedPixelProperties === undefined) {
      return
    }

    onChangePixelClick(selectedPixelProperties.x, selectedPixelProperties.y, selectedPixelProperties.color)
  }

  useEffect(() => {
    fetchPixelInfos()
    setSelectedColor(selectedPixelProperties?.color)
  }, [selectedPixelProperties])

  const isVisible = selectedPixelProperties !== undefined

  return (
    <Slide
      direction='bottom'
      in={isVisible}
    >
      <Flex
        flexDirection={"column"}
        justify={"center"}
        alignItems={"center"}
        height={'100%'}
        width={'100%'}
      >
        <Flex
          flexDirection={"column"}
          justify={"flex-start"}
          alignItems={"center"}
          pointerEvents={"none"}
          height={"100%"}
          width={"70%"}
          borderRadius={'5px 5px 0 0'}
          gap={'50px'}
          backgroundColor={'rgba(0,0,0,0.1)'}
          backdropFilter='blur(10px)'
        >
          <Box flex={1} pointerEvents={"none"}></Box>
          <ButtonAvailableColors height={"30px"} onNewColorSelected={handleNewSelectedColor}/>
          <Text pointerEvents={"auto"} backgroundColor={"#000000"}>{`pixelInfos x: ${selectedPixelProperties?.x} y: ${selectedPixelProperties?.y} priceToChange: ${selectedPixelProperties?.priceToChange}`}</Text>
          <ChangePixelColorButton onClick={handleChangePixelClick}/>
        </Flex>
      </Flex>
    </Slide>
  )
}
