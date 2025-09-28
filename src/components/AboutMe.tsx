export function AboutMe() {
	return (
		<div className="ml-[0.5cm] sm:ml-[1cm] mr-2 pt-6">
			<p className="text-[20px] font-normal">About Me</p>
			<div className="text-[15px]">
				<p className="leading-tight"> 
					I am student at {" "}
					<a 
						href="https://um6p.ma/"
						target="_blank" 
						className="font-medium text-green-900 hover:underline"
					>
						UM6P
					</a> 
					{", "}
					<a 
						href="https://1337.ma/en/"
						target="_blank" 
						className="font-medium text-green-900 hover:underline"
					>
						1337 Coding School
					</a> 
					{" "} in Benguerir campus Morocco.
				</p>
				<br />
				<p className="pb-1 leading-tight"> I currently build and study about web development applications, specially backend development. </p>
				<p className="pb-1 leading-tight">
					My latest project is {" "}
					<a 
						href="https://github.com/nabilaadou/ft_transcendence" 
						target="_blank" 
						className="font-medium text-green-900 hover:underline"
					>
						Ft-transcendence
					</a>
					{" "} a real-time SPA web application where one of the things I've done is designing the whole backend architecture as microservices.
				</p>
				<p className="pb-1 leading-tight">
					Besides this i like competitive programing, an experience that highlights this is my participant in a CodingGame challenge where i represented my
					school in this event where i individually ranked worldwide 172nd and my school got ranked 2nd.
				</p>
				<p className="pb-1 leading-tight"></p>
			</div>
		</div>
	)
}