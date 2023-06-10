import {FunctionComponent, useCallback} from "react"
import { Graphics } from "@pixi/react"

interface PixelSquareProps {
  x: number
  y: number
  size: number
  color: string
}

export const PixelSquare: FunctionComponent<PixelSquareProps> = ({ x, y, size, color }) => {
  const draw = useCallback((g: Graphics) => {
    g.clear()
    g.beginFill(color)
    g.moveTo(x, y);
    g.lineTo(x, y + size);
    g.lineTo(x + size, y + size);
    g.lineTo(x + size, y);
    g.endFill()
  }, [])

  return (
    <Graphics draw={draw} />
  )
}
