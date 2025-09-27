import { Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage'
import { Project3 } from './pages/Project3'
import { Project2 } from './pages/Project2'

export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Landingpage />}/>
				<Route path='/ft_transcendance' element={<Project3 />}/>
				<Route path='/codeVisualizer' element={<Project2 />}/>
			</Routes>
		</div>
	)
}