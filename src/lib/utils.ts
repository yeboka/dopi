import { MENU_TREE, type MenuItem } from '@/shared/menu'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentNode = (stack: string[]) => {
  let node: MenuItem = MENU_TREE
  for (const id of stack) {
    node = node.children?.find(child => child.id === id) ?? node
  }
  return node
}
