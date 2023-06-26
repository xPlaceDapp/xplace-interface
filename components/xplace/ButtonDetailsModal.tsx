import {FC, useEffect, useState} from "react"
import {Box, Flex, Slide, Text} from "@chakra-ui/react"
import {PixelsApi} from "../../utils/xplaceClient"
import {PixelInfosBo} from "../../xplace-client"
import {ButtonAvailableColors} from "./ButtonAvailableColors"

interface ButtonDetailsModalProps {
  pixelCoordinates?: { x: number, y: number }
}

export const ButtonDetailsModal: FC<ButtonDetailsModalProps> = ({ pixelCoordinates }) => {
  const [pixelInfos, setPixelInfos] = useState<PixelInfosBo | undefined>(undefined)
  const fetchPixelInfos = async () => {
    if (pixelCoordinates === undefined) {
      return
    } else {
      setPixelInfos(undefined)
      const infos = (await PixelsApi.pixelsControllerGetPixelInfos(pixelCoordinates.x, pixelCoordinates.y)).data

      setPixelInfos(infos)
    }
  }

  useEffect(() => {
    fetchPixelInfos()
  }, [pixelCoordinates])

  const isVisible = pixelCoordinates !== undefined

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
          <ButtonAvailableColors height={"30px"}/>
          <Text pointerEvents={"auto"} backgroundColor={"#000000"}>{`pixelInfos x: ${pixelInfos?.x} y: ${pixelInfos?.y} priceToChange: ${pixelInfos?.priceToChange}`}</Text>
        </Flex>
      </Flex>
    </Slide>
  )
}
