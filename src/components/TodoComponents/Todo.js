import React from 'react';


const Todo = (props) => {
    return (
      <div>
          <p className="task" id={props.id} onClick={props.onClick}>
            - {props.task}
          </p>
      </div>
    )
  }

export default Todo;