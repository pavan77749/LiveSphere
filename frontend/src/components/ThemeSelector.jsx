import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { PaletteIcon } from 'lucide-react'
import { THEMES } from '../constants'

const ThemeSelector = () => {
      const {theme, setTheme} = useThemeStore()
  return (
    <div className='dropdown dropdown-end'>
        {/* Dropdown Trigger  */}
        <button className='btn btn-ghost btn-circle' tabIndex={0}>
            <PaletteIcon className='size-5' />
        </button>
        <div className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-xl w-56 border border-base-content/10 max-h-80 overflow-y-auto">
        <div className="space-y-1">
        {
            THEMES.map((themeOption) => (
                <button key={themeOption.name} className={`btn btn-ghost w-full justify-start ${theme === themeOption.name? 'bg-base-200 text-primary' : 'text-base-content hover:bg-base-200'}`} onClick={() => setTheme(themeOption.name)}>
                <PaletteIcon className="size-4"/>
                   <span className="font-medium">{themeOption.label}</span>
                   <div className="ml-auto flex gap-1">
                   {  themeOption.colors.map((color,i)=> (
                        <span key={i} className="size-2 rounded-full" style={{backgroundColor: color}}/>
                    ))
                   }
                  </div>
                </button>
            ))


        }
        </div>
        </div>
    </div>
  )

}

export default ThemeSelector
