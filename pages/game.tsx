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
import {useTransaction} from "@useelven/core"
import {TransactionPendingModal} from "../components/core/TransactionPendingModal"
import {TransactionOnNetwork} from "@multiversx/sdk-network-providers/out"
import {useChangePixelColorTransaction} from "../hooks/xplace/useChangePixelColorTransaction"

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
  const [pixels, setPixels] = useState<Array<PixelsBo>>([])

  const gridSize = 10 // TODO : fetch from API

  const fetchPixels = async () => {
    const data = (await PixelsApi.pixelsControllerGetAllPixels()).data

    setPixels(data)
  }

  const { changePixelColor, pending, txResult, error } = useChangePixelColorTransaction(() => {
    fetchPixels()
  })
  const txResultCasted = txResult as (TransactionOnNetwork | undefined)

  const handleTapOnPixel = (x: number, y: number) => {
    const isSamePixel = selectedPixel?.x === x && selectedPixel?.y === y

    if (isSamePixel) {
      setSelectedPixel(undefined)
    } else {
      setSelectedPixel({x, y})
    }
  }

  const getPixelColor = (x: number, y: number) => {
    return pixels.find(e => e.x === x && e.y === y)!.color // should never be called before pixels are fetched
  }

  const handleChangePixelClick = (x: number, y: number, color: string) => {
    changePixelColor(x, y)
  }

  useEffect(
    () => {
      fetchPixels()
    },
    []
  )

  const selectedPixelProperties = selectedPixel !== undefined ? {
    x: selectedPixel.x,
    y: selectedPixel.y,
    color: getPixelColor(selectedPixel.x, selectedPixel.y)
  } : undefined

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
        <ButtonDetailsModal selectedPixelProperties={selectedPixelProperties} onChangePixelClick={handleChangePixelClick}/>
        <TransactionPendingModal
          isOpen={pending}
          successTxHash={txResultCasted?.hash}
          txError={error}
          additionalMessage={'lol'}
        />
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
