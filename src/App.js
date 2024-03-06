import React, { useEffect, useState } from 'react';
import './App.css';
import CalendarIcon from './CalendarIcon';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import lock from './lock.gif'; // Importing the lock.gif image


function App() {
	const [todolist, setTodolist] = useState(JSON.parse(localStorage.getItem('todolist')) || []);
	const [list, setList] = useState('');
	const [currentDate, setCurrentDate] = useState('');

	useEffect(() => {
		localStorage.setItem('todolist', JSON.stringify(todolist));
	}, [todolist]);

	useEffect(() => {
		const today = new Date();
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const formattedDate = today.toLocaleDateString('en-US', options);
		setCurrentDate(formattedDate);
	}, []);

	const addTodo = (task) => {
		setTodolist([...todolist, { task, completed: false }]);
		setList('');
	};

	const deleteTodo = (name) => {
		setTodolist(todolist.filter(el => el.task !== name));
	};

	const completeTodo = (name) => {
		setTodolist(todolist.map(el => {
			if (el.task === name) {
				return {
					...el,
					completed: !el.completed
				};
			}
			return el;
		}));
	};

	const deleteAllTasks = () => {
		setTodolist([]);
	};

	return (
		<div className="App">
			<SignedOut>
				<div className="sign-in-container">
					<div className="card">
						<img src={lock} style={{ height: '250px' }} alt="Lock" />
						<h3>Your Lists are Secured with us.<br />Login to Access your To-Do's</h3>
						<SignInButton style={{ height: '50px', fontSize: '20px', backgroundColor: '#008a3e', color: '#ffffff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} />
					</div>
				</div>
			</SignedOut>

			<SignedIn>
				<div className="header" style={{ marginTop: '0px' }}>
					<div className="headercard">
						<h1 style={{ display: 'inline' }}>My To-Do List</h1>
						<span style={{ float: 'right' }}>
							<UserButton style={{ fontSize: '20px' }} />
						</span>
					</div>
				</div>

				<div className="card-container">
					<div className="add-task-card card">
						<h2>Add Task</h2>
						<form onSubmit={(e) => {
							e.preventDefault();
							if (!list.trim()) return;
							addTodo(list);
						}}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									type='text'
									value={list}
									onChange={(e) => setList(e.target.value)}
									placeholder="Add a new task..."
									className="input-field"
								/>
								<button type='submit' className="button">Add</button>
							</div>
						</form>
					</div>

					{todolist.length > 0 && (
						<div className="display-task-card card">
							<h2>Task List</h2>
							<table>
								<tbody>
									{todolist.map((el, ind) => (
										<tr key={ind} style={{ marginBottom: '10px' }}>
											<td style={{ textDecoration: el.completed ? 'line-through' : 'none' }}>{el.task}</td>
											<td>
												<button
													onClick={() => completeTodo(el.task)}
													className="complete-button"
												>
													{el.completed ? 'Undo' : 'Completed'}
												</button>
											</td>
											<td>
												<button
													onClick={() => deleteTodo(el.task)}
													className="delete-button"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<center>
								<button onClick={deleteAllTasks} className="button">Delete All Tasks</button>
							</center>
						</div>
					)}
				</div>

				<div className="calendar-container" style={{ position: 'absolute', top: '50px', right: '20px' }}>
					<div className="card">
						<CalendarIcon />
						<span className="date">{currentDate}</span>
					</div>
				</div>
			</SignedIn>
		</div>
	);
}

export default App;
