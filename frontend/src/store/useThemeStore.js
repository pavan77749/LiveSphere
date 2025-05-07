import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("livesphere-theme") || 'night',
    setTheme: (theme) =>
        {
            localStorage.setItem("livesphere-theme", theme)
            set({ theme })
        } 
}))

