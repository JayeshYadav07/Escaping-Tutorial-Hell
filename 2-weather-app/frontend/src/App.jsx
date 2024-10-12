import axios from "axios";
import { useState } from "react";
const API_URL = "http://localhost:8000/weather/";

export default function App() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});
	const handleSearch = async (e) => {
		if (e.key === "Enter") {
			setLoading(true);
			try {
				const response = await axios.get(`${API_URL}${e.target.value}`);
				setData(response.data.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		}
	};
	return (
		<div className="flex justify-center h-screen">
			<div>
				<input
					type="search"
					className="border border-black-800 rounded-md px-4 py-2 my-3 min-w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 h-10 mt-14"
					onKeyUp={handleSearch}
				/>
				<div>
					{loading && <p>Loading...</p>}
					{!loading && (
						<div className="max-w-sm bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg p-6">
							<div className="flex items-center justify-between">
								<div>
									<h2 className="text-3xl font-bold text-gray-800">
										{data.address}
									</h2>
									<p className="text-md text-gray-600">
										{data.conditions}
									</p>
									<p className="text-sm text-gray-500 mt-2">
										{data.description}
									</p>
								</div>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-12 w-12 text-blue-500"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M6 10a4 4 0 110-8 4 4 0 010 8zm4 8a6 6 0 100-12 6 6 0 000 12zm-8-6a4 4 0 018 0h-8z" />
									</svg>
								</div>
							</div>
							<div className="flex items-center justify-between mt-6">
								<div className="flex items-center">
									<span className="text-6xl font-semibold text-blue-600">
										{data.temp}°C
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
