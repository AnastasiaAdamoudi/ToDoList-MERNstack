import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const API_BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  function GetTodos() {
    fetch(API_BASE_URL + '/to-do-list')
      .then(res => res.json())
      .then(data => {
        console.log(data); // Log the API response to check the data
        setTodos(data);
      })
      .catch(error => console.log('Error:', error));
  }

  return (
    <div className='App'>
      <h1>Welcome!</h1>
      <h4>Your Tasks</h4>
      <div className='todos'>
        <div className='todo'>
          <div className='checkbox'></div>
          <div className='text'>Write more code!</div>
          {/* <div className='edit'>edit</div> */}
          <div className='delete'>delete</div>
      </div>
      <div className='todo is-complete'>
        <div className='checkbox is-complete'></div>
        <div className='text'>Create React app</div>
        {/* <div className='edit'>edit</div> */}
        <div className='delete'>delete</div>
      </div>
      </div>
      <div className='add'>add</div>
    </div>
  );
}

export default App;
