import { Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage';
import { Blog1, BlogListPage } from './pages/Blog1';

export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Landingpage />}/>
				<Route path='/blogs' element={<BlogListPage />}/>
				<Route path='/blogs/1' element={<Blog1 />}/>
			</Routes>
		</div>
	)
}