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
					{" "} in Benguerir campus Morocco, currently pursuing an RNCP Level 7 qualification in computer architecture.
				</p>
				<br />
				<p className="pb-1 leading-tight">
					currently focused on Java and Spring Boot, with a strong interest in backend and distributed systems.
					During my six-month end-of-studies internship at {" "}
					<a
						href="https://innovx.com/"
						target="_blank"
						className="font-medium text-green-900 hover:underline"
					>
						INNOVX
					</a>
					, I worked on backend migrations, authentication,
					testing, cloud integrations, and built an internal developer platform from 0 to 1.
					I enjoy diving deep into how software systems work and turning that understanding into practical,
					well-engineered solutions. I'm currently open to software engineering opportunities.
				</p>
				<p className="pb-1 leading-tight"></p>
			</div>
		</div>
	)
}
