import { useState } from "react"
import { Header } from "../components/Header";
import { AboutMe } from "../components/AboutMe";
import { useNavigate } from "react-router-dom";



export function Project1() {
	const navigate = useNavigate()

	return (
		<div>
			<a 
				href="https://github.com/nabilaadou/ft_transcendence" 
    			target="_blank" 
				className="font-semibold text-green-900 hover:underline"
			>
				Fullstack Real-Time Pong Game with Matchmaking and Tournaments
			</a>
			<p 
				className="text-[15px] leading-tight pr-[1cm] pb-1"
			>
				I worked on this project with three teammates, and my main focus was authentication, user management, and DevOps.
				That meant building and maintaining both the backend and frontend parts of these services.
			</p>
			<button
				className="text-[15px] leading-tight hover:underline"
				onClick={() => {navigate('/projects/ft_transcendance')}}
			>
				... See More
			</button> 
			<hr />
			<a 
				className="text-[15px] text-green-900 hover:underline"
				href="https://github.com/nabilaadou/ft_transcendence"
				target="_blank"
			>
				GitHub
			</a>
		</div>
	)
}

export function Project2() {
	const navigate = useNavigate()

	return (
		<div>
			<a 
				href="https://github.com/nabilaadou/codeVisualiser" 
    			target="_blank" 
				className="font-semibold text-green-900 hover:underline"
			>
				Interactive Python Call Graph Visualizer
			</a>
			<p 
				className="text-[15px] leading-tight pr-[1cm] pb-1"
			>
				I built a Python web application that generates call graph diagrams that show how functions relate to each other and how execution flows across a codebase.
				The idea was to make it easier to understand complex projects by turning raw source code into something visual and interactive.
			</p>
			<button
				className="text-[15px] leading-tight hover:underline"
				onClick={() => {navigate('/projects/codeVisualizer')}}
			>
				... See More
			</button> 
			<hr />
			<a 
				className="text-[15px] text-green-900 hover:underline"
				href="https://github.com/nabilaadou/ft_transcendence"
				target="_blank"
			>
				GitHub
			</a>
		</div>
	)
}


export function Project3() {
	const [readMore, setReadMore] = useState(true);

	return (
		<div>
			<a 
				href="https://github.com/nabilaadou/webServ" 
    			target="_blank" 
				className="font-semibold text-green-900 hover:underline"
			>
				HTTP Server Engine Using Linux Epoll
			</a>
			<p 
				className="text-[15px] leading-tight pr-[1cm] pb-1"
			>
				One of my all-time favorite projects was building an HTTP server from scratch.
				I wrote it in C++ and used Linux epoll for handling communication between the server and clients.
				I enjoyed this project because it had tremendous added value, it taught me how data actually flows through the internet, how APIs work,
				and how core HTTP methods like GET, POST, and DELETE are implemented.
			</p>
			{ readMore &&
				<button
					className="text-[15px] leading-tight hover:underline"
					onClick={() => {setReadMore(readMore ? false : true)}}
				>
					... read more
				</button> 
			}
			{ !readMore &&
				<div>
					<p 
						className="text-[15px] leading-tight pr-[1cm] pb-1"
					>
						The server i built is able to serve static content and dynamic content using CGI scripts, and its core features included, using EPOLL
						to efficiently monitor client connections, parsing raw HTTP requests, and constructing proper responses for the client.
					</p>
					<p 
						className="text-[15px] leading-tight pr-[1cm] pb-1"
					>
						One of the more interesting challenges was handling file uploads. To make this reliable,
						I designed a binary-safe string class as a replacement for std::string. This allowed the server to manage large file uploads efficiently
						and stay stable even under heavy load.
					</p>
					<p 
						className="text-[15px] leading-tight pr-[1cm] pb-1"
					>
						To validate the server’s functionality, I tested it extensively with Postman, ensuring that requests were handled correctly,
						responses matched expectations, and edge cases (including error handling) were covered.
					</p>
				</div>
			}
			{ !readMore && 
				<button
					className="text-[15px] hover:underline"
					onClick={() => {setReadMore(readMore ? false : true)}}
				>
					hide text
				</button> 
			}
			<hr />
			<a 
				className="text-[15px] text-green-900 hover:underline"
				href="https://github.com/nabilaadou/ft_transcendence"
				target="_blank"
			>
				GitHub
			</a>
		</div>
	)
}

function RecentProjects() {
	return (
		<div className="ml-auto mr-2 pt-6 h-screen w-[92%]">
			<p className="text-[20px] font-light font-normal">Recent Project</p>
			<div className="flex flex-col gap-3">
				<Project1 />
				<Project2 />
			</div>
		</div>
	)
}

function Body() {
	return (

		<div className="lg:flex lg:ml-auto lg:w-[94%] lg:gap-8 bg-white h-full">
			{/* about me section on the left side */}
			<AboutMe />
			{/* recent projects section */}
			<RecentProjects />
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