import { create } from 'zustand'

interface MouseState {
  x: number
  y: number
  updateMouse: (x: number, y: number) => void
}

export const useMouseStore = create<MouseState>((set) => ({
  x: 0,
  y: 0,
  updateMouse: (x, y) => set({ x, y })
}))

// Hook to track mouse movement
export function useMousePosition() {
  const updateMouse = useMouseStore((state) => state.updateMouse)

  const updateMousePosition = (e: MouseEvent) => {
    // Get normalized coordinates (-1 to 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    updateMouse(x, y)
  }

  return { updateMousePosition }
} 