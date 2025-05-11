import React from 'react'
import {Link,  useLocation } from 'react-router'
import useAuthUser from '../hooks/useAuthUser'
import { BellIcon, OrbitIcon, User } from 'lucide-react'
import { HomeIcon } from 'lucide-react'

const Sidebar = () => {
    const {authUser} = useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname;

    

  return (
   <aside className='w-64 bg-base-100 h-screen border-r border-base-300 hidden lg:flex flex-col sticky top-0'>
    <div className='p-5 border-b border-base-300'>
    <Link to='/' className='flex items-center gap-2 p-4'>
        <OrbitIcon className='text-primary w-9 h-9' />
        <span className='text-2xl font-bold text-primary font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>LiveSphere</span>
    </Link>
    </div>

    <nav className="flex-1 p-4 space-y-1">
        <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? 'bg-base-200 text-primary' : 'text-base-content hover:bg-base-200'}`}>
        <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
        </Link>
    
   
        {/* <Link to="/friends" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/friends' ? 'bg-base-200 text-primary' : 'text-base-content hover:bg-base-200'}`}>
        <User className="size-5 text-base-content opacity-70" />
            <span>Friends</span>
        </Link> */}
  

        <Link to="/notifications" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notification' ? 'bg-base-200 text-primary' : 'text-base-content hover:bg-base-200'}`}>
        <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
        </Link>
        </nav>

        {/* User Profile  */}

        <div className="py-4  border-t border-base-300 mt-auto"></div>
        <div className="flex items-center gap-3 p-4">
            <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
                    {authUser?.profilePicture ? (
                        <img src={authUser.profilePicture} alt="Profile" className="rounded-full" />
                    ) : (
                        <span>{authUser?.fullName.charAt(0)}</span>
                    )}
                </div>
            </div>
            <div className="flex-1">
                <p className="text-base font-semibold">{authUser?.fullName}</p>
                <span className="text-sm opacity-70 gap-1">{authUser?.email}</span>
              <p className='text-sm text-success opacity-70 flex items-center gap-1'>
                <span className='size-2 rounded-full bg-success inline-block'>
                    Online
                </span>
              </p>
            </div>
        </div>


   </aside>
  )
}

export default Sidebar
