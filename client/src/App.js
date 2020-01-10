import React, {useState, useEffect} from 'react';

import Todo from './components/todo.js'
import InProgress from './components/inprogress.js'
import Done from './components/done.js'
import './App.css';

function App() {
  const [text, setText] = useState('some text');

  const callApi = async ()=>{
    const response = await fetch('/api/hello');
    const body = await response.json();

    if(response.status != 200) throw Error(body.message)

    return body;
  }

  useEffect(()=>{
    callApi().then(res=>{
      setText(res.express)
    })
  })

  return (
    <div className="App">
      <h2 id="title" contenteditable="true">Call out API</h2>
      <p id="description">{text}</p>
      <div id="manager">
        <Todo />
        <InProgress />
        <Done />
      </div>
      <button id="new-todo-input-display">+</button>
      <div id="new-todo-input">
        <input type="text" value="" onChange="" placeholder="new todo.." />
        <button>Add</button>
      </div>
    </div>
  );
}

export default App;
