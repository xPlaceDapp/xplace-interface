import {NextPage} from "next"
import React, {FunctionComponent, MouseEventHandler, useEffect, useState, WheelEventHandler} from "react"
import { PixelsApi } from "../utils/xplaceClient"
import {PixelSquare} from "../components/PixelSquare"
import useWindowDimensions from "../utils/useWindowDimensions"
import dynamic from "next/dynamic"
import {AppProvider, useApp} from "@pixi/react"
import {Application} from "pixi.js"
import {PixelsBo} from "../xplace-client"
import {LoginModalButton} from "../components/core/LoginModalButton"
import {Box, Text} from "@chakra-ui/react"
import {ButtonDetailsModal} from "../components/xplace/ButtonDetailsModal"

const Stage = dynamic(() =>
  import('@pixi/react').then((mod) => mod.Stage), {
    ssr: false
  }
)
const PixiComponentViewport = dynamic(() =>
  import('../components/PixiComponentViewport').then((mod) => mod.PixiComponentViewport), {
    ssr: false
  }
)

interface GameComponentProps {
  windowHeight: number
  windowWidth: number
}

type SelectedPixelState = {x: number, y: number} | undefined

let app: Application | undefined

const GameComponent: FunctionComponent<GameComponentProps> = (props) => {
  const app = useApp()
  const windowDimensions = useWindowDimensions()
  const [zoomPercent, setZoomPercent] = useState(1)
  const [selectedPixel, setSelectedPixel] = useState<SelectedPixelState>(undefined)

  const gridSize = 10 // TODO : fetch from API

  const fetchPixels = async () => {
    const data = (await PixelsApi.pixelsControllerGetAllPixels()).data

    /*
    const data: PixelsBo[] = []
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        data.push({
          address: "",
          playedCount: 0,
          x: x,
          y: y,
          color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
        })
      }
    }*/
    setPixels(data)
  }

  const handleTapOnPixel = (x: number, y: number) => {
    const isSamePixel = selectedPixel?.x === x && selectedPixel?.y === y

    if (isSamePixel) {
      setSelectedPixel(undefined)
    } else {
      setSelectedPixel({x, y})
    }
  }

  const [pixels, setPixels] = useState<Array<PixelsBo>>([])

  useEffect(
    () => {
      fetchPixels()
    },
    []
  )

  return (
    <Box
      position={"absolute"}
      display={"flex"}
      flexDirection={"column"}
      width={props.windowWidth}
      height={props.windowHeight}
    >
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"flex-end"}
        zIndex={100000}
        width={"100%"}
        pointerEvents={"all"}
      >
        <LoginModalButton/>
      </Box>
      <Box
        position={"absolute"}
        zIndex={1}
      >
        <Stage
          width={props.windowWidth}
          height={props.windowHeight}
          options={{ backgroundColor: 0xffffff }}
        >
          <PixiComponentViewport app={app} width={props.windowWidth} height={props.windowHeight} zoomPercent={zoomPercent}>
            {
              pixels.map(e => {
                const pixelSize = windowDimensions.height / gridSize
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
                  onClick={() => handleTapOnPixel(e.x, e.y)}
                />
              })
            }
          </PixiComponentViewport>
        </Stage>
      </Box>
      <Box
        position={"absolute"}
        zIndex={1000000}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justify={"center"}
        height={"100%"}
        width={"100%"}
        pointerEvents={"none"}
      >
        <ButtonDetailsModal pixelCoordinates={selectedPixel}/>
      </Box>
    </Box>
  )
}

const Game: NextPage = () => {
  const windowDimensions = useWindowDimensions()

  if (windowDimensions.height === undefined || windowDimensions.width === undefined) { // TODO : ugly
    return <div>loading...</div>
  }

  if (app === undefined) {
    app = new Application({ height: 600, width: 800 })
  }

  return (
    <AppProvider value={app!}>
      <GameComponent windowHeight={windowDimensions.height} windowWidth={windowDimensions.width}/>
    </AppProvider>
  )
}

export default Game
