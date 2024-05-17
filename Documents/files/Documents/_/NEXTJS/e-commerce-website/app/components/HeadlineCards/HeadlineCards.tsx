import Image, { StaticImageData } from "next/image";
import HeroImg from "@/public/assets/images/pexels-robin-stickel-70497.jpg";
import img01 from "@/public/assets/images/pexels-horizon-content-3738730.jpg";
import img02 from "@/public/assets/images/pexels-ash-376464.jpg";

export default function HeadlineCards() {
	interface TopMenu {
		name: string;
		comment: string;
		img: StaticImageData;
	}
	const topMenu = [
		{
			name: "Sun`s Out, Bogo`s Out",
			comment: "Through 8/26",
			img: img01,
		},
		{
			name: "New Restaurant",
			comment: "Added daily",
			img: img02,
		},
		{
			name: "We Deliver Desserts",
			comment: "Tasty treats",
			img: HeroImg,
		},
	];
	return (
		<div className="max-w-[1200px] mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
			{/* CARDS  */}
			{topMenu.map((menu: TopMenu) => (
				<div key={menu.name} className="rounded-xl group relative">
					{/* OVERLAY  */}
					<div className="absolute px-2 w-full h-full bg-black/50  rounded-xl text-white">
						<p className="font-bold text-2xl pt-4">{menu.name}</p>
						<p className="">{menu.comment}</p>
						<button className="border-white bg-white text-black absolute bottom-4">
							Order Now
						</button>
					</div>
					<Image
						className="w-full max-h-[200px] group-hover:scale-105 rounded-xl object-cover duration-500"
						src={menu.img}
						alt="hero"
					/>
				</div>
			))}
		</div>
	);
}
