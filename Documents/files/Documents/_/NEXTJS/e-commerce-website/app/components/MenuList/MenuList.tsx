"use client";
import React, { useState, useEffect } from "react";
import { data } from "../Data/Data";
import Image from "next/image";

export default function MenuList() {
	const [foods, setFoods] = useState(data);
	useEffect(() => {
		console.log(data);
	});

	// FILTER TYPE
	const FilterType = (category: string) => {
		const filteredCategorey = data.filter((item) => {
			return item.category === category;
		});
		return setFoods(filteredCategorey);
	};

	// FILTER PRICE
	const filterPrice = (price: string) => {
		const filteredPrice = data.filter((item) => {
			return item.price === price;
		});
		setFoods(filteredPrice);
	};

	return (
		<div className="max-w-[1200px] m-auto px-4 py-12">
			<h1 className="text-orange-600 font-bold text-4xl text-center">
				Top Rated menu
			</h1>

			{/* FILTER ROW  */}
			<div className="font-bold text-gray=700 lg:flex md:justify-between">
				{/* FILTER TYPE  */}
				<div className="">
					<p className="font-bold text-gray-700">filter type</p>
					<div className="flex justify-between flex-wrap ">
						<button
							onClick={() => setFoods(data)}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1">
							All
						</button>
						<button
							onClick={() => FilterType("burger")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1">
							Burgers
						</button>
						<button
							onClick={() => FilterType("pizza")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1">
							Pizza
						</button>
						<button
							onClick={() => FilterType("salad")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1">
							Salad
						</button>
						<button
							onClick={() => FilterType("chicken")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1">
							Chicken
						</button>
					</div>
				</div>
				{/* FILTER Price  */}
				<div>
					<p className="font-bold text-gray-700">filter type</p>
					<div className="flex justify-between max-w-[360px] w-full">
						<button
							onClick={() => filterPrice("$")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 ">
							$
						</button>
						<button
							onClick={() => filterPrice("$$")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 ">
							$$
						</button>
						<button
							onClick={() => filterPrice("$$$")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 ">
							$$$
						</button>
						<button
							onClick={() => filterPrice("$$$$")}
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 ">
							$$$$
						</button>
					</div>
				</div>
			</div>

			{/* DISPLAY FOODS  */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
				{foods.map((item, index) => (
					<div
						key={index}
						className="border shadlow-2xl hover:csale-105 rounded-lg duration-300 ">
						<Image
							src={item.image}
							alt={item.name}
							width={500}
							height={500}
							className="w-full h-[200px] object-cover rounded-t-lg"
						/>
						<div className="flex justify-between px-2 py-4">
							<p className="font-bold">{item.name}</p>
							<p>
								<span className="bg-orange-500 text-white p-1 rounded">
									{" "}
									{item.price}{" "}
								</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
