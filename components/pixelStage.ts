import React from 'react'
import {Viewport as PixiViewport} from 'pixi-viewport'
import {PixiComponent} from "@pixi/react"
import {Application, EventSystem} from "pixi.js"

interface StageProps {
  width: number
  height: number
  children?: React.ReactNode
}

interface PixiStageProps extends StageProps {
  app: Application
}

const PixelStage = PixiComponent('PixelStage', {
  create: (props: PixiStageProps) => {

    console.log({ isWindowDefined: window !== undefined })

    const stage = props.app.stage
    stage.color

    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      ticker: props.app.ticker,
      events: new EventSystem(props.app.renderer)
    })
    viewport.drag().pinch().wheel().clampZoom({})

    stage.addChild(viewport)

    return stage
  },
})

export default PixelStage
