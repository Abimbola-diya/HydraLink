import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
};
type AuthState = {
	value: {
		isAuth: boolean;
		username: string;
		uid: string;
	};
};

const initialState = {
	value: {
		isAuth: false,
		username: "",
		uid: "",
	},
} as AuthState;

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: () => {
			localStorage.clear();
			return initialState;
		},
		logIn: (state, action: PayloadAction<string>) => {
			const user = {
				isAuth: true,
				username: action.payload,
				uid: action.payload,
			};
			state.value = user;
			localStorage.setItem("user", JSON.stringify(user) || "");
		},
	},
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
