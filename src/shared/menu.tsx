import CoverFlow from '@/pages/CoverFlow'
import type { ReactNode } from 'react'

export interface MenuItem {
  id: string
  title: string
  type: 'menu' | 'list' | 'component'
  children?: MenuItem[]
  component?: ReactNode
  action?: string // only in list type
}

export const MENU_TREE: MenuItem = {
  id: 'root',
  title: 'dopi',
  type: 'menu',
  children: [
    {
      id: 'cover-flow',
      type: 'component',
      title: 'Cover Flow',
      component: <CoverFlow />
    },
    {
      id: 'music',
      type: 'menu',
      title: 'Music',
      children: [
        {
          id: 'playlists',
          type: 'list',
          title: 'Playlists',
          action: 'play',
          component: ['playlist1', 'playlist2', 'playlist3']
        },
        {
          id: 'albums',
          type: 'list',
          title: 'Albums',
          action: 'play',
          component: ['album1', 'album2', 'album3']
        },
        {
          id: 'artists',
          type: 'list',
          title: 'Artists',
          action: 'play',
          component: ['artist1', 'artist2', 'artist3']
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'list',
      children: [
        {
          id: 'general',
          title: 'General',
          type: 'list',
          action: 'setTheme',
          component: ['general1', 'general2', 'general3']
        },
        {
          id: 'theme',
          title: 'Theme',
          type: 'list',
          action: 'setTheme',
          component: ['theme1', 'theme2', 'theme3']
        }
      ]
    },
    {
      id: 'about',
      title: 'About',
      type: 'component',
      component: 'about project page'
    },
    {
      id: 'sign-in',
      title: 'Sign in',
      type: 'component',
      action: 'signIn',
      component: 'sign in page'
    }
  ]
}
