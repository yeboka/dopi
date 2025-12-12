import { getCurrentNode } from '@/lib/utils'
import { Directions } from '@/shared/constants'
import { create } from 'zustand'
export interface Menu {
  stack: string[]
  selectedIndex: number
  scroll: (direction: Directions, type?: 'clamp' | 'loop') => void
  select: () => void
  goBack: () => void
}

export const useMenu = create<Menu>(set => ({
  stack: ['root'],
  selectedIndex: 0,
  scroll: (direction, type = 'clamp') => {
    set(state => {
      const oldIndex = state.selectedIndex
      const currentNode = getCurrentNode(state.stack)

      if (currentNode.type === 'component') return state

      const MAX_INDEX = currentNode.children?.length
        ? currentNode.children.length - 1
        : 0
      const MIN_INDEX = 0
      if (type === 'clamp') {
        const newIndex = oldIndex + (direction === Directions.FORWARD ? 1 : -1)
        return {
          selectedIndex: Math.max(Math.min(newIndex, MAX_INDEX), MIN_INDEX)
        }
      } else {
        const newIndex = oldIndex + (direction === Directions.FORWARD ? 1 : -1)
        return {
          selectedIndex: newIndex < 0 ? MIN_INDEX : newIndex % MAX_INDEX
        }
      }
    })
  },
  select: () => {
    set(state => {
      const currentNode = getCurrentNode(state.stack)
      if (currentNode.type === 'component') return state
      if (currentNode.type === 'menu') {
        const id = currentNode.children?.[state.selectedIndex]?.id
        if (!id) return state
        const newStack = [...state.stack, id]
        return {
          stack: newStack,
          selectedIndex: 0
        }
      }
      if (currentNode.type === 'list') {
        console.log(currentNode.action)
        return state
      }
      return state
    })
  },
  goBack: () => {
    set(state => {
      if (state.stack.length <= 1) return state
      const newStack = [...state.stack]
      newStack.pop()
      return {
        stack: newStack,
        selectedIndex: 0
      }
    })
  }
}))
