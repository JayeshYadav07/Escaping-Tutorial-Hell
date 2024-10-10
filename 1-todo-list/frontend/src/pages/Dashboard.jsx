import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:8000/todos";

function Dashboard() {
	let [todo, setTodo] = useState("");
	let [todos, setTodos] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(BACKEND_URL + "/", { withCredentials: true })
			.then((res) => setTodos(res.data))
			.catch((err) => {
				console.error(err.response.data.error);
				navigate("/");
			});
	}, [setTodos]);

	const addTodo = () => {
		if (todo.trim()) {
			axios
				.post(
					BACKEND_URL + "/",
					{ title: todo, completed: false },
					{ withCredentials: true }
				)
				.then((res) => {
					setTodos([...todos, res.data.Data]);
					setTodo("");
				})
				.catch((err) => console.error(err.response.data.error));
		}
	};

	const toggleTodo = (id) => {
		let todo = {};

		let newTodos = todos.map((item) => {
			if (item.id === id) {
				item.completed = !item.completed;
				todo = item;
			}
			return item;
		});

		axios
			.put(BACKEND_URL + "/" + id, { ...todo }, { withCredentials: true })
			.then(() => {
				setTodos(newTodos);
			})
			.catch((err) => console.error(err.response.data.error));
	};

	const deleteTodo = (id) => {
		axios
			.delete(BACKEND_URL + "/" + id, { withCredentials: true })
			.then(() => {
				setTodos(todos.filter((item) => item.id !== id));
			})
			.catch((err) => console.error(err.response.data.error));
	};

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center">
			<div className="bg-white p-8 rounded shadow-lg w-96">
				<h1 className="text-2xl font-bold mb-4 text-center">
					Todo List
				</h1>

				<div className="flex mb-4">
					<input
						className="w-full p-2 border border-gray-300 rounded"
						type="text"
						placeholder="Add a new task..."
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
					/>
					<button
						onClick={addTodo}
						className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
					>
						Add
					</button>
				</div>

				<ul>
					{todos.map((item) => (
						<li
							key={item.id}
							className="flex justify-between items-center mb-2"
						>
							<span
								className={`flex-1 ${
									item.completed
										? "line-through text-gray-400"
										: ""
								}`}
								onClick={() => toggleTodo(item.id)}
							>
								{item.title}
							</span>
							<button
								onClick={() => deleteTodo(item.id)}
								className="bg-red-500 text-white px-2 py-1 rounded"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Dashboard;
