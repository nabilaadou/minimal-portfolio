import React from 'react'
import { Landingpage } from './pages/LandingPage'

export default function App() {
	return (
		<div className='flex bg-gray-300 h-screen'>
			<div className='flex-1'></div>
			<div className='w-3/4'>
				<Landingpage />
			</div>
			<div className='flex-1'></div>
		</div>
	)
}