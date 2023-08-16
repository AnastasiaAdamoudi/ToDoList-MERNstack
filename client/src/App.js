import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null); // Track which todo is being edited
  const [editedTodoText, setEditedTodoText] = useState('');
  const API_BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  async function GetTodos() {
    await fetch(API_BASE_URL + '/to-do-list')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTodos(data);
      })
      .catch(error => console.log('Error:', error));
  }

  async function completeTodo(id) {
    const data = await fetch(API_BASE_URL + '/to-do-list/complete/' + id)
      .then(res => res.json());
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }));
  }

  async function editTodo(id, newText) {
    const data = await fetch(API_BASE_URL + '/to-do-list/edit/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.text = data.text;
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
    setTodos(todos => todos.filter(todo => todo._id !== id));
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
        {todos.map(todo => (
          <div className={'todo' + (todo.complete ? ' is-complete' : '')} key={todo._id}>
            <div className='checkbox'>
              <input
                type='checkbox'
                checked={todo.complete}
                onChange={() => completeTodo(todo._id)}
              />
            </div>

            {editingTodoId === todo._id ? (
              <input
                type='text'
                value={editedTodoText}
                onChange={e => setEditedTodoText(e.target.value)}
              />
            ) : (
              <div className='text'>{todo.text}</div>
            )}

            <div className='buttons'>
              {editingTodoId === todo._id ? (
                <>
                  <button onClick={() => editTodo(todo._id, editedTodoText)}>Save</button>
                  <button onClick={() => setEditingTodoId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditingTodoId(todo._id)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}

        <button className='add' onClick={() => setPopupActive(true)}>add</button>
        {popupActive ? (
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
                onClick={() => addTodo()}>Create new to-do
              </button>
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
