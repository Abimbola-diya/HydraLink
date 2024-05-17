"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Login from "./components/login";
import { useAppSelector } from "@/redux/store";
import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/Hero";
import HeadlineCards from "./components/HeadlineCards/HeadlineCards";
import MenuList from "./components/MenuList/MenuList";
import Categories from "./components/Categories/Categories"

export default function Home() {
	// const [user, setUser] = useState("")

	// const username = useAppSelector((state) => state.AuthReducer.value.username);
	// const isModerator = useAppSelector(
	// 	(state) => state.AuthReducer.value.isModerator
	// );

	return (
		<main className="">
			<Navbar />
			<Hero />
			<HeadlineCards />
			<MenuList />
			<Categories />
		</main>
	);
}
