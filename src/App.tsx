import React from 'react'
import { Landingpage } from './pages/LandingPage'

export default function App() {
	return (
		<div className='flex bg-gray-300 h-full justify-center'>
			{/* <div className='flex-1'></div> */}
			<div className='w-[30cm]'>
				<Landingpage />
			</div>
			{/* <div className='flex-1'></div> */}
		</div>
	)
}