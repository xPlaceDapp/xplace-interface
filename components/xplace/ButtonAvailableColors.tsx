import {FC, useState} from "react"
import {Flex} from "@chakra-ui/react"
import {ButtonAvailableColorItem} from "./ButtonAvailableColorItem"

interface ButtonAvailableColorsProps {
  height: string,
  selectedColor: string,
  onNewColorSelected: (color: string) => void
}

export const ButtonAvailableColors: FC<ButtonAvailableColorsProps> = ({ selectedColor, height , onNewColorSelected}) => {
  const colors = [
    "#ffff00",
    "#ff00ff",
    "#0000ff",
    "#ff0000",
    "#ffffff",
  ]

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
            onClick={() => onNewColorSelected(color)}
          />
        )
      }
    </Flex>
  )
}
