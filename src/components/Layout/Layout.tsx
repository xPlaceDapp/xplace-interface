import React, { type FC } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthenticatedRoutesWrapper } from 'components'
import { routes, routeNames } from 'routes'

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { search } = useLocation()
  return (
    <AuthenticatedRoutesWrapper
      routes={routes}
      unlockRoute={`${routeNames.unlock}${search}`}
    >
      {children}
    </AuthenticatedRoutesWrapper>
  )
}
