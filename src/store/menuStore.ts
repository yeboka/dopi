import { create } from 'zustand'

export interface Menu {
  focusedIndex: number
  length: number
  incrementFocusedIndex: () => void
  decrementFocusedIndex: () => void
}

export const useMenu = create<Menu>(set => ({
  focusedIndex: 0,
  length: 5,
  incrementFocusedIndex: () =>
    set((state: Menu) => ({
      focusedIndex: Math.min(state.length, state.focusedIndex + 1)
    })),
  decrementFocusedIndex: () =>
    set((state: Menu) => ({
      focusedIndex: Math.max(0, state.focusedIndex - 1)
    }))
}))
