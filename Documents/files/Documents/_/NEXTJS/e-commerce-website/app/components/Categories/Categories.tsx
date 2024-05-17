"use client";
import React from "react";
import { categories } from "../Data/Data";
import Image from "next/image";

export default function Categories() {
	return (
		<div className="max-w-[1200px] mx-auto px-4 py=12 ">
			<h1 className="text-orange-600 font-bold text-4xl text-center">
				Top Rated Menu Itmes
			</h1>

			{/* CATEGORIES  */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
				{categories.map((item) => (
					<div
						key={item.id}
						className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
						<h2 className="font-bold sm:text-xl">{item.name}</h2>
						<Image src={item.image} alt={item.name} height={80} width={80} />
					</div>
				))}
			</div>
		</div>
	);
}
