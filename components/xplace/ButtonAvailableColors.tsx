import {FC, useState} from "react"
import {Flex} from "@chakra-ui/react"
import {ButtonAvailableColorItem} from "./ButtonAvailableColorItem"

interface ButtonAvailableColorsProps {
  height: string,
  pixelColor: string
}

export const ButtonAvailableColors: FC<ButtonAvailableColorsProps> = ({ pixelColor, height }) => {
  const [selectedColor, setSelectedColor] = useState<string>(pixelColor)
  const colors = [
    "#ffff00",
    "#ff00ff",
    "#0000ff",
    "#ff0000",
    "#ffffff",
  ]

  const handleClickOnColor = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      gap={"10px"}
      height={height}
      pointerEvents={"auto"}
    >
      {
        colors.map(color =>
          <ButtonAvailableColorItem
            key={color}
            isSelected={color === selectedColor}
            color={color}
            onClick={handleClickOnColor}
          />
        )
      }
    </Flex>
  )
}
