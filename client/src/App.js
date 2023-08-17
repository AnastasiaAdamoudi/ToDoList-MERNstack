import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // State to store todos that are fetched from the database
  const [popupActive, setPopupActive] = useState(false); // State to track whether the popup to add a todo is active or not
  const [newTodo, setNewTodo] = useState(''); // State to store the text of the new todo that the user wants to add
  const [editingTodoId, setEditingTodoId] = useState(null); // State to store the id of the todo that the user wants to edit
  const [editedTodoText, setEditedTodoText] = useState(''); // State to store the text of the todo that the user wants to edit
  const API_BASE_URL = 'http://localhost:3000'; // Base url of the API (the server)

  useEffect(() => { // useEffect hook to fetch all todos from the database when the component mounts
    GetTodos();
    console.log(todos);
  }, []);

  function GetTodos() {
    fetch(API_BASE_URL + '/to-do-list')
      .then(res => res.json()) // parse the response as JSON
      .then(data => {      // store the data in the todos state variable (we use then instead of await here because we are using the useEffect hook, which is an async function)
        console.log(data);
        setTodos(data); // store the data in the todos state variable
      })
      .catch(error => console.log('Error:', error));
  }

  async function completeTodo(id) {
    const data = await fetch(API_BASE_URL + '/to-do-list/complete/' + id)
      .then(res => res.json()); 
    setTodos(todos => todos.map(todo => { // map over the todos and update the complete status of the todo that the user wants to mark as complete
      if (todo._id === data._id) { // if the id of the todo matches the id of the todo that the user wants to mark as complete
        todo.complete = data.complete; // update the complete status of the todo
      }
      return todo;
    }));
  }

  async function editTodo(id, newText) {
    const data = await fetch(API_BASE_URL + '/to-do-list/edit/' + id, {
      method: 'PATCH', // use the PATCH method for partial updates
      headers: { // set the Content-Type header to application/json because we are sending JSON data to the server
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }), // convert the JavaScript object to JSON and send it as the request body
    }).then(res => res.json()); 

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) { // if the id of the todo matches the id of the todo that the user wants to edit
        todo.text = data.text; // update the text of the todo
      }
      return todo;
    }));

    setEditingTodoId(null); // Clear the editing state after successful edit
    setEditedTodoText('');
  }
  

  async function deleteTodo(id) {
    await fetch(API_BASE_URL + '/to-do-list/delete/' + id, {
      method: 'DELETE'
    });
    setTodos(todos => todos.filter(todo => todo._id !== id));   // filter out the todo that the user wants to delete
  }

  async function addTodo() {
    const data = await fetch(API_BASE_URL + '/to-do-list/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTodo })
    }).then(res => res.json());
    setTodos(todos => [...todos, data]);
    setPopupActive(false);
    setNewTodo('');
  }

  return (
    <div className='App'>
      <h1>Welcome!</h1>
      <h4>Your Tasks</h4>

      <div className='todos'>
        {todos.map(todo => ( // map over the todos and display them
          <div className={'todo' + (todo.complete ? ' is-complete' : '')} key={todo._id}> {/* if the todo is complete, add the is-complete class */}
            <div className='checkbox'>
              <input
                type='checkbox'
                checked={todo.complete}
                onChange={() => completeTodo(todo._id)}
              />
            </div>

            {editingTodoId === todo._id ? ( // if the todo is being edited, display the edit box
      <input
        type='text'
        className='edit-todo-input'
        value={editedTodoText}
        onChange={e => setEditedTodoText(e.target.value)} // update the editedTodoText state variable when the user types in the edit box
      />
    ) : (
      <div className='text'>{todo.text}</div> // if the todo is not being edited, display the todo text
    )}

    <div className='buttons'>
      {editingTodoId === todo._id ? ( // if the todo is being edited, display the save and cancel buttons
        <>
          <button className='edit' onClick={() => editTodo(todo._id, editedTodoText)}>Save</button>
          <button className='delete' onClick={() => setEditingTodoId(null)}>Cancel</button>
        </>
      ) : ( // if the todo is not being edited, display the edit and delete buttons
        <>
          <button className='edit' onClick={() => {
            setEditingTodoId(todo._id);
            setEditedTodoText(todo.text); // Set the existing todo text in the edit box
          }}>Edit</button>
          <button className='delete' onClick={() => deleteTodo(todo._id)}>Delete</button>
        </>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
              )}
            </div>
          </div>
        ))}

        <button className='add' onClick={() => setPopupActive(true)}>add</button>
        {popupActive ? ( // if the popupActive state variable is true, display the popup
          <div className='popup'>
            <div className='close-popup' onClick={() => setPopupActive(false)}>x</div>
            <div className='popup-content'>
              <h3>Add a new task</h3>
              <input
                className='add-todo-input'
                type='text'
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <button
                className='create-todo'
                onClick={() => addTodo()}>Create
              </button>
            </div>
          </div>
        ) : ''} {/* if the popupActive state variable is false, display nothing and the popup is hidden */}
      </div>
    </div>
  );
}

export default App;
