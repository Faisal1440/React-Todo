import React from 'react';

import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm';


class App extends React.Component {
  constructor() {
    super();

    this.state = { 
      todos: [
        {
          task: 'Make a To-Do List',
          id: 1,
          completed: false,
        }, {
          task: 'Start Adding To It',
          id: 2,
          completed: false,
        }
    ]
  }
}

//add a new todo object to the todo array
addToDo = (newTask, id) => {
  const todo = {
    task: `${newTask}`,
    id: id,
    completed: false,
  }

  //add  new todo to  end using push()
  const todos = this.state.todos;
  todos.push(todo)

  // Set current state -> new todo array
  this.setState({todos})
  localStorage.setItem("todos", JSON.stringify(todos));
}

// creates new todo
addToDoHandler = (element) => {

  element.preventDefault();


  const input = element.target.previousSibling.value;
  
  // Set current date as  id 
  const id = Date.now();

  return this.addToDo(input, id)
}

//toggles task as completed or unfinished
toggleComplete = (element) => {

    const current = element.target;
    const todos = this.state.todos.map(todo => {

      if (Number(current.id) === todo.id) {
        // Add a class that strikes through the word
        current.classList.toggle('completed');
        todo.completed = !todo.completed;
      }

      return todo;
    });

    
    this.setState({todos})
    localStorage.setItem("todos", JSON.stringify(todos));
}

// removes completed todos
removeComplete = (element) => {

  
    element.preventDefault();
    let filtered = [];

    let todos = this.state.todos.filter(todo => {
      
      if(todo.completed !== true) {
        filtered.push(todo);
      }

      
      return filtered;
    });

    todos = filtered;
    this.setState({todos})
    localStorage.setItem("todos", JSON.stringify(todos));
}

hydrateStateWithLocalStorage() {

  for (let key in this.state) {
  
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);

      
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value })
      } catch (e) {
        this.setState({ [key]: value })
      }
    }
  }
}

componentDidMount() {
  this.hydrateStateWithLocalStorage();
}

  render() {
    return (
      <div className="todo-container">
        <h1>ToDo List: MVP</h1>
        
        <TodoList key={this.state.todos.id} todos={this.state.todos} toggleComplete={this.toggleComplete} />
        <TodoForm submit={this.addToDoHandler} removeComplete={this.removeComplete}/>
      </div>
    );
  }
}

export default App;