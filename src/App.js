import TodoList from './feature/'
import React from 'react';

class App extends React.Component {
	
	componentDidMount(){
		if (!localStorage.getItem('todoList')) {
			let todo_list = [
				{
					id: 1,
					title: "Make a meal",
					description: "lorem ipsum",
					status: 0,
					createdAt: "2019-11-15 18:00"
				},
				{
					id: 2,
					title: "Dinner with family",
					description: "lorem ipsum",
					status: 0,
					createdAt: "2019-11-16 18:00"
				},
				{
					id: 3,
					title: "Watch scary movie",
					description: "lorem ipsum",
					status: 0,
					createdAt: "2019-11-15 13:00"
				},
				{
					id: 4,
					title: "Learn something new",
					description: "lorem ipsum",
					status: 1,
					createdAt: "2019-11-15 08:00"
				},
				{
					id: 5,
					title: "Make a phone call to mom",
					description: "lorem ipsum",
					status: 1,
					createdAt: "2019-11-15 04:00"
				}
			]


			localStorage.setItem('todoList', JSON.stringify(todo_list));
		}
		
	}

	render() {
		
		return (
			<TodoList/>
			);
		}
	}

export default App;
