import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage'
import { Project3 } from './pages/Project3'
import { Project2 } from './pages/Project2'
import { useState } from 'react';

export default function App() {
	const	[page, setPage] = useState('/');

	return (
		// <div>
		// 	{ page === '/' && <Landingpage setPage={setPage} /> }
		// 	{ page === '/project3' && <Project3 setPage={setPage} /> }
		// 	{ page === '/project2' && <Project2 setPage={setPage} /> }
		// </div>
		<div>
			<p>big black cock</p>
			<Routes>
				<Route path='/minimal-portfolio/' element={<Landingpage setPage={setPage} />}/>
				<Route path='/minimal-portfolio/projects/ft_transcendance' element={<Project3 setPage={setPage}/>}/>
				<Route path='/minimal-portfolio/projects/codeVisualizer' element={<Project2 setPage={setPage}/>}/>
			</Routes>
		</div>
	)
}