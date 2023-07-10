import { useEffect, useState, type FC } from 'react'
import { AppProvider, useApp, Stage } from '@pixi/react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Application } from 'pixi.js'
import { PixiComponentViewport } from '../components/xplace/PixiComponentViewport'
import { PixelSquare } from '../components/xplace/PixelSquare'
import { PixelsApi } from '../utils/xplaceClient'
import { ButtonDetailsModal } from '../components/xplace/ButtonDetailsModal'
import { changePixel } from '../utils/changePixel'
import { useGetPendingTransactions } from '../hooks'
import { NavBar } from '../components/xplace/NavBar'
import { type PixelConfigBo, type PixelsBo } from '../xplace-client'

interface GameComponentProps {
  windowHeight: number
  windowWidth: number
}

type SelectedPixelState = { x: number, y: number } | undefined

let app: Application | undefined

const GameComponent: FC<GameComponentProps> = (props) => {
  const app = useApp()
  const { hasPendingTransactions } = useGetPendingTransactions()
  const [selectedPixel, setSelectedPixel] = useState<SelectedPixelState>(undefined)
  const [pixels, setPixels] = useState<PixelsBo[] | undefined>(undefined)
  const [pixelConfig, setPixelConfig] = useState<PixelConfigBo | undefined>(undefined)

  const gridSize = 10 // TODO : fetch from API

  const fetchPixels: () => Promise<void> = async () => {
    const data = (await PixelsApi.pixelsControllerGetAllPixels()).data

    setPixels(data)
  }

  const fetchPixelConfig: () => Promise<void> = async () => {
    const data = (await PixelsApi.pixelsControllerGetConfig()).data

    setPixelConfig(data)
  }

  const handleTapOnPixel: (x: number, y: number) => void = (x, y) => {
    if (hasPendingTransactions) {
      return
    }

    const isSamePixel = selectedPixel?.x === x && selectedPixel?.y === y

    if (isSamePixel) {
      setSelectedPixel(undefined)
    } else {
      setSelectedPixel({ x, y })
    }
  }

  const getPixelColor: (x: number, y: number) => string = (x, y) => {
    const pixel = pixels?.find(e => e.x === x && e.y === y)

    if (pixel === undefined) {
      return '#ffffff'
    }

    return pixel.color // should never be called before pixels are fetched
  }

  const handleChangePixelClick: (x: number, y: number, color: string) => void = (x, y, color) => {
    const availableColor = pixelConfig?.availableColors.find(e => e.colorHex === color)

    if (availableColor === undefined) {
      return
    }

    void changePixel(x, y, availableColor.discriminant)
  }

  useEffect(
    () => {
      if (hasPendingTransactions) {
        setSelectedPixel(undefined)
      } else {
        void fetchPixels()
      }
    },
    [hasPendingTransactions]
  )

  useEffect(
    () => {
      void fetchPixelConfig()
    },
    []
  )

  const selectedPixelProperties = selectedPixel !== undefined
    ? {
        x: selectedPixel.x,
        y: selectedPixel.y,
        color: getPixelColor(selectedPixel.x, selectedPixel.y)
      }
    : undefined

  const isLoading = pixelConfig === undefined || pixels === undefined

  if (isLoading) {
    return <Text>loading...</Text>
  }

  return (
    <Box
      position={'absolute'}
      display={'flex'}
      height={'100%'}
      width={'100%'}
      flexDirection={'column'}
    >
      <Flex
          position={'absolute'}
          zIndex={10}
          height={'100%'}
          width={'100%'}
          pointerEvents={'none'}
      >
        <NavBar/>
      </Flex>
      <Box
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        cursor={'grab'}
        zIndex={1}
      >
        <Stage
          width={props.windowWidth}
          height={props.windowHeight}
          options={{ backgroundColor: 0xffffff }}
        >
          <PixiComponentViewport app={app} width={props.windowWidth} height={props.windowHeight}>
            {
              pixels.map(e => {
                const pixelSize = window.innerHeight / gridSize
                const isSelected = selectedPixel?.x === e.x && selectedPixel?.y === e.y
                const x = e.x * pixelSize
                const y = ((gridSize - 1) - e.y) * pixelSize
                const id = `${x}${y}`
                return <PixelSquare
                  key={id}
                  x={x}
                  y={y}
                  size={pixelSize}
                  color={e.color}
                  isSelected={isSelected}
                  onClick={() => { handleTapOnPixel(e.x, e.y) }}
                />
              })
            }
          </PixiComponentViewport>
        </Stage>
      </Box>
      <Flex
          position={'absolute'}
          zIndex={10}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justify={'center'}
          height={'100%'}
          width={'100%'}
          pointerEvents={'none'}
      >
        <ButtonDetailsModal
            selectedPixelProperties={selectedPixelProperties}
            onChangePixelClick={handleChangePixelClick}
            availableColors={pixelConfig.availableColors}
        />
      </Flex>
    </Box>
  )
}

const Game: FC = () => {
  const height = window.innerHeight
  const width = window.innerWidth

  if (app === undefined) {
    app = new Application({ height: 600, width: 800 })
  }

  return (
    <AppProvider value={app}>
      <GameComponent windowHeight={height} windowWidth={width}/>
    </AppProvider>
  )
}

export default Game
