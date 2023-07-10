import { dAppName } from 'config'
import { type RouteType } from 'types'
import { withPageTitle } from './components/PageTitle'

import { Dashboard, Home, SignMessage, Statistics } from './pages'
import Game from './pages/Game'

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  statistics: '/statistics',
  signMessage: '/sign-message',
  unlock: '/unlock',
  game: '/game'
}

interface RouteWithTitleType extends RouteType {
  title: string
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.statistics,
    title: 'Statistics',
    component: Statistics,
    authenticatedRoute: true
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.signMessage,
    title: 'Sign Message',
    component: SignMessage,
    authenticatedRoute: true
  },
  {
    path: routeNames.game,
    title: 'xPlace',
    component: Game,
    authenticatedRoute: false
  }
]

export const mappedRoutes = routes.map((route) => {
  const title = route.title !== ''
    ? `${route.title} • MultiversX ${dAppName}`
    : `MultiversX ${dAppName}`

  const requiresAuth = Boolean(route.authenticatedRoute)
  const wrappedComponent = withPageTitle(title, route.component)

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  }
})
