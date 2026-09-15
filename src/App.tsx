import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/LandingPage';

const Blog1 = lazy(() => import('./pages/Blog1').then((module) => ({ default: module.Blog1 })));
const BlogListPage = lazy(() => import('./pages/Blog1').then((module) => ({ default: module.BlogListPage })));

export default function App() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-white p-6 text-sm text-gray-500" role="status">Loading page…</div>}>
			<Routes>
				<Route path='/' element={<Landingpage />}/>
				<Route path='/blogs' element={<BlogListPage />}/>
				<Route path='/blogs/1' element={<Blog1 />}/>
			</Routes>
		</Suspense>
	)
}
