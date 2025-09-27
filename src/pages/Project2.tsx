import { useNavigate } from "react-router-dom"

export function Project2() {
	const navigate = useNavigate()

	return (
		<div className="bg-gray-100 pb-[3cm]">
			{/* header */}
			<div className="flex justify-between p-4">
				<button 
					className="flex justify-start font-extrabold text-[18px] hover:underline"
					onClick={() => {navigate('/')}}
				>
					BACK
				</button>
				<div className="font-extrabold text-[18px] leading-tight">
					<p>nabilaadou@gmail.com</p>
					<p>linkedin.com/in/nabilaadou</p>
				</div>
			</div>
			{/* into and overview */}
			<div className="flex flex-col gap-8 pr-[5cm] pl-[5cm]">
				<div className="pt-4">
					<img src="./../assets/project-2/landing-page.png" alt="" />
				</div>
				<div>
					<p className="font-bold text-[18px] text-green-900">PYTHON CODE VISUALIZER</p>
					<p className="font-bold text-[30px] leading-tight">Interactive Python Call Graph Visualizer (Web Application)</p>
				</div>
				<div className="flex justify-between">
					<p className="font-bold text-[25px] w-1/2">OVERVIEW</p>
					<div className="w-1/2">
						<div className="flex justify-between pb-10">
							<div>
								<p className="font-semibold text-green-900 pb-2">TIMELINE</p>
								<div className="font-bold leading-tight">
									<p className="text-[14px]">MARCH 2025-</p>
									<p className="text-[14px]">APRIL 2025</p>
								</div>
							</div>
							<div>
								<p className="font-semibold text-green-900 pb-2">RESPONSIBILITIES</p>
								<div className="font-bold leading-tight">
									<p className="text-[14px]">handling User Uploads, Extractin Metadata,</p>
									<p className="text-[14px]">DevOps, Frontend</p>
								</div>
							</div>
						</div>
						<p className="font-bold text-[14px] pb-1">
							A web application for visualizing Python code structure by generating interactive call graphs. 
							Upload a Python codebase and instantly explore function-level dependencies, call relationships, and flow, all through a clean, visual interface.
						</p>
						<p className="font-bold text-[14px] pb-1">
							The stack includes TypeScript for the frontend, Python with FastApi for the backend and d3.js for generating interactive graphs.
						</p>
						<p className="font-bold text-[14px]">
							In addition, the project also made use of Docker and Docker Compose for containerization.
						</p>
					</div>
				</div>
				<hr className="border-t-2  w-full" />
				{/* section 1 */}
				<div className="flex justify-between">
					<p className="font-bold text-[25px] w-1/2">HANDLING USER UPLOADS</p>
					<div className="w-1/2">
						<p className="font-bold text-[14px] pb-1">
							A basic upload box where the user choses the folder of their Python project and a file as an entrypoint, 
							after uploading the folder i send the files to the backend for it to be checked.
						</p>
					</div>
				</div>
				{/* section 1 - images */}
				<div className="border border-2 border-black p-2 inline-block">
  					<img src="./../assets/project-2/upload.png"/>
				</div>
				{/* section 2 */}
				<div className="flex justify-between">
					<p className="font-bold text-[25px] w-1/2">EXTRACTING METADATA</p>
					<div className="w-1/2">
						<p className="font-bold text-[14px] pb-1">
							I used the Astroid library to parse Python code, which generates an AST (Abstract Syntax Tree).
							My task is to traverse this tree and extract the necessary data (arguments, return types, file paths, line numbers, and their relationships with other functions).
							To start, I determine the root of the call graph: if the entry point contains a main function, I use that; otherwise,
							I consider all global functions as entry points. From there, I recursively check which functions are called inside each function, building out the call graph step by step.
						</p>
						<p className="font-bold text-[14px] pb-1">
							On the frontend, I integrated D3.js to turn that data into dynamic, interactive diagrams. Users could explore the call graph visually, zooming into details or stepping back to see the bigger picture.
						</p>
					</div>
				</div>
				{/* section 2 - images */}
				<div className="border border-2 border-black p-2 inline-block">
  					<img src="./../assets/project-2/graph.png"/>
				</div>
				{/* section 3 */}
				<div className="flex justify-between">
					<p className="font-bold text-[25px] w-1/2">DEVOPS</p>
					<div className="w-1/2">
						<p className="font-bold text-[14px] pb-1">
							Containerized the entire application using Docker Compose, enabling fast, one-command setup and consistent development environments.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}