import { useNavigate } from "react-router-dom"

export function Project3({setPage}: {setPage: Function}) {
	const	navigate = useNavigate();
	return (
		<div className="bg-gray-100 pb-[3cm]">
			{/* header */}
			{/* still need to handle respnsivnese */}
			<div className="flex justify-between p-4">
				<button 
					className="flex justify-start font-extrabold text-[18px] hover:underline"
					// onClick={() => {setPage('/')}}
					onClick={() => {navigate('/minimal-portfolio')}}
				>
					BACK
				</button>
				<div className="font-extrabold text-[18px] leading-tight">
					<p>nabilaadou@gmail.com</p>
					<p>linkedin.com/in/nabilaadou</p>
				</div>
			</div>
			{/* into and overview */}
			<div className="flex flex-col gap-8 w-[90%] mx-auto">
				<div className="pt-4">
					<img src="/minimal-portfolio/assets/project-3/landing-page.png" alt="" />
				</div>
				<div>
					<p className="font-bold text-[18px] text-green-900">FT-TRANCSENDANCE</p>
					<p className="font-bold text-[30px] leading-tight">Fullstack Real-Time Pong Game with Matchmaking and Tournaments (SPA Web Application)</p>
				</div>
				{/* overview */}
				<div className="lg:flex lg:justify-between">
					<p className="font-bold text-[25px] lg:text-[30px] mb-3 lg:w-1/2">OVERVIEW</p>
					<div className="lg:w-1/2">
						<div className="flex gap-6 pb-6">
							<div>
								<p className="font-semibold lg:text-[18px] text-green-900 pb-2">TIMELINE</p>
								<div className="font-bold leading-tight text-[14px] lg:text-[17px]">
									<p>AUGUST 2025-</p>
									<p>SEPTEMBER 2025</p>
								</div>
							</div>
							<div>
								<p className="font-semibold lg:text-[18px] text-green-900 pb-2">RESPONSIBILITIES</p>
								<div className="font-bold leading-tight text-[14px] lg:text-[17px]">
									<p>Authentication, User-Managment,</p>
									<p>DevOps, Frontend</p>
								</div>
							</div>
						</div>
						<p className="font-bold text-[14px] lg:text-[17px] pb-1">
							Ft-Transcendance is a school project that serves as an introduction to full-stack web development.
							It’s a real-time Ping Pong game with player matchmaking and additional features.
						</p>
						<p className="font-bold text-[14px] lg:text-[17px] pb-1">
							The stack includes TypeScript for the frontend, Node.js with Fastify for the backend, SQLite for persistent storage,
							and TailwindCSS for styling.
						</p>
						<p className="font-bold text-[14px] lg:text-[17px] pb-1">
							In addition, the project also made use of Docker and Docker Compose for containerization, RabbitMQ for message brokering,
							and even a mini React library I built myself to make it easier to code this SPA.
						</p>
					</div>
				</div>
				<hr className="border-t-2  w-full" />
				{/* section 1 */}
				<div className="lg:flex lg:justify-between">
					<p className="font-bold text-[25px] lg:text-[30px] mb-3 lg:w-1/2">AUTHENTICATION</p>
					<div className="font-bold text-[14px] lg:text-[17px] pb-1 lg:w-1/2">
						<p>
							I implemented Google Sign-In for user authentication. Once a login attempt is verified with Google,
							the backend issues a JWT and attaches it to an HTTP-only cookie so it’s protected from client-side access
							(e.g., JavaScript can’t read it, reducing the risk of XSS attacks).
						</p>
						<p>
							If the user has two-factor authentication (2FA) enabled,
							they are prompted to enter the correct verification code before being granted access to the application.
						</p>
						<p>
							For added security, the JWT has an expiration time,
							and refresh tokens are managed to allow users to stay signed in without constantly re-authenticating. 
							All sensitive actions are validated on the backend using the JWT extracted from the cookie, ensuring that authentication and authorization are handled securely.
						</p>
					</div>
				</div>
				{/* section 1 - images */}
				<div className="border border-2 border-black p-1 inline-block">
  					<img src="/minimal-portfolio/assets/project-3/login.png"/>
				</div>
				{/* section 2 */}
				<div className="lg:flex lg:justify-between">
					<p className="font-bold text-[25px] lg:text-[30px] mb-3 lg:w-1/2">USER MANAGMENT</p>
					<div className="font-bold text-[14px] lg:text-[17px] pb-1 lg:w-1/2">
						<p>
							For user management, I designed the system so that every account is uniquely tied to a Google identity.
							Once authenticated, users can modify their profile with custom settings such as usernames, avatars, and personal preferences,
							which are stored persistently in the database.
						</p>
						<p>
							Each action a user takes in the application is validated against their JWT on the backend, ensuring that permissions are enforced securely.
						</p>
						<p>
							Beyond authentication and profile management, the application also handles how users connect with one another.
							Players can send and accept friend requests, Once connected, friends can easily see each other’s online status,
							with the option of removing or blocking a friend.
						</p>
					</div>
				</div>
				{/* section 2 - images */}
				<div className="border border-2 border-black p-1 inline-block">
  					<img src="/minimal-portfolio/assets/project-3/chat.png"/>
				</div>
				{/* section 3 */}
				<div className="lg:flex lg:justify-between">
					<p className="font-bold text-[25px] lg:text-[30px] mb-3 lg:w-1/2">DEVOPS</p>
					<div className="font-bold text-[14px] lg:text-[17px] pb-1 lg:w-1/2">
						<p>
							To support scalability and maintainability, the project follows a microservices architecture.
							Each service is containerized using Docker, and the entire environment can be spun up with a single command through Docker Compose.
							For communication between services, I used RabbitMQ as a message broker, ensuring reliable and asynchronous event handling across the system.
							This setup not only simplifies deployment but also makes it easy to replicate the environment on any machine with minimal configuration.
						</p>
					</div>
				</div>
				<hr className="border-t-2  w-full" />
				<div className="border border-2 border-black p-1 inline-block">
  					<img src="/minimal-portfolio/assets/project-3/2fa-enable.png"/>
				</div>
				<div className="border border-2 border-black p-1 inline-block">
  					<img src="/minimal-portfolio/assets/project-3/chat-accesibility.png"/>
				</div>
				<div className="border border-2 border-black p-1 inline-block">
  					<img src="/minimal-portfolio/assets/project-3/settings-modify-name.png"/>
				</div>
			</div>
		</div>
	)
}