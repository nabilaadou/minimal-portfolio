import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage'
import { Project3 } from './pages/Project3'
import { Project2 } from './pages/Project2'

export default function App() {
	return (
		<div>
			<p>test</p>
			<BrowserRouter basename="/minimal-portfolio">
				<Routes>
					<Route path='/' element={<Landingpage />}/>
					<Route path='/projects/ft_transcendance' element={<Project3 />}/>
					<Route path='/projects/codeVisualizer' element={<Project2 />}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}