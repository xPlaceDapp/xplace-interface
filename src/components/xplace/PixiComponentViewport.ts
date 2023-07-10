import type React from 'react'
import type * as PIXI from 'pixi.js'
import { Viewport as PixiViewport } from 'pixi-viewport'
import { PixiComponent } from '@pixi/react'

export interface ViewportProps {
  width: number
  height: number
  children?: React.ReactNode
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application
}

export const PixiComponentViewport = PixiComponent<PixiComponentViewportProps, PixiViewport>('Viewport', {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      ticker: props.app.ticker
    })

    viewport.drag().pinch().wheel({ wheelZoom: true })

    return viewport
  },

  applyProps(instance: PixiViewport, oldProps: Readonly<ViewportProps>, newProps: Readonly<ViewportProps>) {
    const { width, height } = newProps

    instance.resize(width, height)
  }
})
