import React from 'react';
import './Todo.css';

const TodoForm = (props) => {
    return (
      <div>
          <form>
            <input placeholder="I need to..." />
            <button onClick={props.submit}>Add ToDo</button>
            <button className="clear" onClick={props.removeComplete}>Clear Completed</button>
          </form>
      </div>
    )
  }

  export default TodoForm;