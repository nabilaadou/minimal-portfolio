export function Landingpage() {
	return (
		<div className="relative flex flex-col border">
			{/* header portion of the page */}
			<div className="bg-green-900 text-white">
				<div className="flex">
					{/* personel img */}
					<div className="absolute w-[6cm] h-[6cm] m-6 border border-white border-2">
						<img src="./../assets/me.jpg" alt="" />
					</div>
					{/* infos */}
					<div className="ml-[7.5cm] mt-[1.1cm] mb-[1.5cm]">
						<div className="flex gap-2 leading-12">
							<p className="text-[40px] font-semibold">Nabil</p>
							<p className="text-[40px] font-light">aadou</p>
						</div>
						<p className="text-[18px] leading-6">Numerical Architecture Student At 1337 Coding School</p>
						<p className="text-[18px] leading-6">Aspiring Backend Developer</p>
						<p className="text-[18px] leading-6">nabilaadou@gmail.com</p> 
					</div>
				</div>
				<div className="flex gap-8 w-full h-10 items-center bg-gray-100 text-black pl-[7cm] border border-gray-400">
					<p>about</p>
					<p>projects</p>
				</div>
			</div>
		</div>
	)
}