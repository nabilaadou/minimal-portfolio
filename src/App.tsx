import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage'
import { Project3 } from './pages/Project3'
import { Project2 } from './pages/Project2'
import { useState } from 'react';

export default function App() {
	const	[page, setPage] = useState('/');

	return (
		<div>
			{ page === '/' && <Landingpage setPage={setPage} /> }
			{ page === '/project3' && <Project3 setPage={setPage} /> }
			{ page === '/project2' && <Project2 setPage={setPage} /> }
		</div>
	)
}