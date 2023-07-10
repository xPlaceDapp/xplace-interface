import { PixiComponent } from '@pixi/react'
import * as PIXI from 'pixi.js'

interface PixelSquareProps {
  x: number
  y: number
  size: number
  color: string
  isSelected: boolean
  onClick: () => void
}

function applyPropsOnPixel(graphics: PIXI.Graphics, { x, y, size, color, isSelected, onClick }: PixelSquareProps): void {
  const colorString = color
  const colorNumber = parseInt(colorString.replace(/^#/, ''), 16)
  graphics.clear()
  graphics.beginFill(colorNumber)
  graphics.moveTo(x, y)
  graphics.lineTo(x, y + size)
  graphics.lineTo(x + size, y + size)
  graphics.lineTo(x + size, y)
  graphics.endFill()

  if (isSelected) {
    graphics.lineStyle(size * 0.1, 0x000000, 1, 1)
      .moveTo(x, y)
      .lineTo(x, y + size)
      .lineTo(x + size, y + size)
      .lineTo(x + size, y)
      .lineTo(x, y)
  }

  graphics.interactive = true
  graphics.hitArea = new PIXI.Rectangle(x, y, size, size)
}

export const PixelSquare = PixiComponent('PixelSquare', {
  create: (props: PixelSquareProps) => {
    const graphics = new PIXI.Graphics()
    applyPropsOnPixel(graphics, props)
    graphics.on('pointerdown', props.onClick)

    return graphics
  },
  applyProps(instance: PIXI.Graphics, oldProps: Readonly<PixelSquareProps>, newProps: Readonly<PixelSquareProps>) {
    instance.on('pointerdown', newProps.onClick)

    if (oldProps.isSelected !== newProps.isSelected || oldProps.color !== newProps.color) {
      applyPropsOnPixel(instance, newProps)
    }
  }
})
