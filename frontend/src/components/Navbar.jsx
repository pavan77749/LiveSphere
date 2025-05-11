import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../lib/api.js'
import { Link } from 'react-router'
import { LogOutIcon, OrbitIcon } from 'lucide-react'
import { BellIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector.jsx'
import useLogout from '../hooks/useLogout.js'

const Navbar = () => {
    const {authUser} =  useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname;

    const isChatPage = location.pathname?.startsWith('/chat')

    // const queryClient = useQueryClient()

    // const {mutate:logoutMutation} =  useMutation({
    //     mutationFn:logout,
    //     onSuccess: () => queryClient.invalidateQueries({queryKey:["authUser"]}),

    // })

    const {logoutMutation} =  useLogout() 


  return (
    <nav className='bg-base-200 border-b border-base-300 sticky
    top-0 z-30 h-16 flex items-center'>
       <div className="container mx-auto px-4 sm:px-6  lg:px-8">
        <div className="flex items-center justify-end w-full">
            {/* Logo - Only in the chat page  */}
           { isChatPage && (<div className="pl-5">
                <Link className='flex items-center gap-2.5' to='/'>
                    <OrbitIcon className='text-primary w-9 h-9' />
                    <span className='text-2xl font-bold text-primary font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>LiveSphere</span>   
                
                </Link>
            </div>)}

            <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/notifications" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notification' ? 'bg-base-200 text-primary' : 'text-base-content hover:bg-base-200'}`}>
        <BellIcon className="size-5 text-base-content opacity-70" />    
        </Link>
            </div>

            {/* ToDo */}
           <ThemeSelector className="gap-3"/>

        <div className="avatar">
            <div className="w-9 rounded-full ">
                <img src={authUser?.profilePicture} alt="user Avatar " />
            </div>
        </div>

        {/* Logout Button */}
        <button onClick={()=> logoutMutation()} className='btn btn-ghost text-base-content hover:bg-base-200'>
           <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
        </button>
             
        </div>
       </div>

    </nav>
  )
}

export default Navbar
