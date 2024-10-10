import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:8000/users";
const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			axios
				.post(
					BACKEND_URL + "/login",
					{
						username,
						password,
					},
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					navigate("/dashboard");
				})
				.catch((err) => {
					alert(err.response.data.error);
				});
		} else {
			axios
				.post(
					BACKEND_URL + "/signup",
					{
						username,
						password,
					},
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					navigate("/dashboard");
				})
				.catch((err) => {
					alert(err.response.data.error);
				});
		}
	};

	const handleChange = (e) => {
		if (e.target.name === "username") {
			setUsername(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
				<h2 className="text-center text-2xl font-bold">
					{isLogin ? "Login" : "Sign Up"}
				</h2>

				<form className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="email"
							required
							className="w-full mt-1 p-2 border border-gray-300 rounded-md"
							placeholder="you@example.com"
							onChange={handleChange}
							name="username"
							value={username}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							required
							className="w-full mt-1 p-2 border border-gray-300 rounded-md"
							placeholder="********"
							onChange={handleChange}
							name="password"
							value={password}
						/>
					</div>

					<div className="flex items-center justify-between">
						<button
							type="submit"
							onClick={handleSubmit}
							className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
						>
							{isLogin ? "Login" : "Sign Up"}
						</button>
					</div>
				</form>

				<p className="text-center text-sm text-gray-600">
					{isLogin
						? "Don't have an account?"
						: "Already have an account?"}{" "}
					<button
						className="text-blue-500 hover:underline"
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin ? "Sign Up" : "Login"}
					</button>
				</p>
			</div>
		</div>
	);
};

export default AuthPage;
