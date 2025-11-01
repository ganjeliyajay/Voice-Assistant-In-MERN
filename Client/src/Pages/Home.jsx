import React from 'react'
import Logout from './Logout'
import Hero from '../Components/Hero'

export default function Home() {
    return (
        <div className='w-full h-[100vh] bg-linear-to-t to-blue-950 from-[#000000]'>
            {/* side bar */}
            <div className='absolute'>
                
            </div>

            <div >
                <Hero />
                <Logout />
            </div>
        </div>
    )
}
