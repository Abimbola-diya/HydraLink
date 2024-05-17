import { logIn } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
	const [userName, setUserName] = useState("");
	const dispatch = useDispatch<AppDispatch>();

	const handleLogin = () => {
		if (!userName) return "Input a valid username";
		dispatch(logIn(userName));
		const uid = localStorage.getItem("user");
		if (uid) {
			console.log("route to home page");
		}
	};
	return (
		<div>
			<input
				type="text"
				name="username"
				placeholder="enter username"
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<input type="submit" value="submite" onClick={handleLogin} />
		</div>
	);
}
