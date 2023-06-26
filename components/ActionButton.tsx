// The component for triggering functions. For in-app navigation use Next Link component

import { Box, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren, useCallback } from 'react';

interface ActionButtonProps extends BoxProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

export const ActionButton: FC<PropsWithChildren<ActionButtonProps>> = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <Box
      as="button"
      borderColor="xplace.black"
      borderWidth={2}
      bgColor="xplace.mainColor"
      py={2}
      px={6}
      rounded="xl"
      fontWeight="normal"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      color="elvenTools.white"
      userSelect="none"
      _hover={!disabled ? { bg: 'xplace.black' } : {}}
      transition="background-color .3s"
      width={isFullWidth ? '100%' : 'auto'}
      onClick={handleClick}
      opacity={!disabled ? 1 : 0.5}
      {...props}
    >
      {children}
    </Box>
  );
};
