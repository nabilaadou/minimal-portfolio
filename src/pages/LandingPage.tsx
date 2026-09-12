import { Header } from "../components/Header";
import { AboutMe } from "../components/AboutMe";
import { useNavigate } from "react-router-dom";



function BlogPreview() {
	const navigate = useNavigate()

	return (
		<div className="pb-3">
			<button
				type="button"
				className="text-left font-semibold text-green-900 hover:underline"
				onClick={() => {navigate('/blogs/1')}}
			>
				Java Program/Application Execution Process — Part 1: Class Loading
			</button>
			<div className="mt-1 flex items-center gap-3 text-[12px] uppercase tracking-[0.08em] text-gray-500">
				<span>Aug 23, 2026</span>
				<span>·</span>
				<span>9 min read</span>
			</div>
			<ul className="mt-2 flex flex-wrap items-center gap-x-1.5 pr-4 text-[11px] text-gray-500" aria-label="Article topics">
				{["Java", "JVM", "Class Loading", "Java Internals"].map((tag, index) => (
					<li key={tag} className="flex items-center gap-x-1.5">
						{index > 0 && <span className="text-gray-300" aria-hidden="true">·</span>}
						<span>{tag}</span>
					</li>
				))}
			</ul>
			<p 
				className="pt-2 text-[15px] leading-tight pr-[1cm] pb-2 text-gray-700"
			>
				Running a Java program requires compiling .java source files into .class bytecode and then
				launching the program on the JVM.
			</p>
			<button
				className="text-[15px] font-medium text-green-900 transition hover:text-green-700 hover:underline"
				onClick={() => {navigate('/blogs/1')}}
			>
				Read more →
			</button> 
			<hr className="mt-4 border-gray-200" />
		</div>
	)
}

function RecentBlogs() {
	return (
		<div className="ml-[0.5cm] sm:ml-[1cm] mr-2 pt-6 lg:w-1/2">
			<p className="text-[20px] font-light font-normal">Recent Blogs</p>
			<div className="flex flex-col gap-3">
				<BlogPreview />
			</div>
		</div>
	)
}

function Body() {
	return (

		<div className="lg:flex lg:ml-[0.5cm] lg:gap-8 bg-white h-full">
			{/* about me section on the left side */}
			<div className="lg:w-1/2">
				<AboutMe />
			</div>
			{/* recent projects section */}
			<RecentBlogs />
		</div>
	)
}

export function Landingpage() {
	return (
		<div className="relative h-screen">
			{/* header portion of the page */}
			<Header />
			{/* body section */}
			<Body />
		</div>
	)
}
