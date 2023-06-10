import React from 'react'
import * as PIXI from 'pixi.js'
import {Viewport as PixiViewport} from 'pixi-viewport'
import {PixiComponent} from "@pixi/react"

export interface ViewportProps {
  width: number
  height: number
  zoomPercent: number
  children?: React.ReactNode
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application
}

export const PixiComponentViewport = PixiComponent('Viewport', {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      ticker: props.app.ticker,
      events: props.app.renderer.events
    })

    viewport.drag().pinch().wheel({ wheelZoom: true })

    return viewport
  },

  applyProps(instance: PixiViewport, oldProps: Readonly<ViewportProps>, newProps: Readonly<ViewportProps>) {
    const { width, height, zoomPercent } = newProps

    instance.resize(width, height)
    instance.setZoom(zoomPercent, true)
  }
})
