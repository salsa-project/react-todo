import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Todo from './components/todo.js'
import InProgress from './components/inprogress.js'
import Done from './components/done.js'
import './App.css';

function App(props) {

  //newTodoLayout display style (display/hide)
  const [newTodoDisplay, setNewTodoDisplay] = useState('none');
  //newTodo text
  const[newTodoText, setNewTodoText] = useState('');

  //display/hide newTodoLayout container
  function newTodoLayoutDisplay(e){
    (newTodoDisplay == 'none')? setNewTodoDisplay('flex'): setNewTodoDisplay('none');
  }
  //display the newTodo text in the input
  function newTodoInputHandler(e){
    setNewTodoText(e.target.value);
  }
  // adding new todo to the server
  function addNewTodoHandler(e){
    if(newTodoText.length < 3) return ;
    let newTodoStore = newTodoText;
    fetch("/newTodo", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //make sure to serialize your JSON body
    body: JSON.stringify({
        body: newTodoStore
      })
    }).then((response) => {
      response.json().then((data)=>{
        if(data.status){
          props.addTodo({item_id: data.item_id, data:newTodoStore})
          setNewTodoText('');
          setNewTodoDisplay('none')
        }
      })
    })
  }

  return (
    <div className="App">
      <h2 id="title">Stuff Todo!</h2>
      <p id="description">{''}</p>
      <div id="manager">
        <Todo />
        <InProgress />
        <Done />
      </div>
      <button id="new-todo-input-display" onClick={newTodoLayoutDisplay}>+</button>
      <div id="new-todo-input" style={{display: newTodoDisplay}}>
        <input type="text" value={newTodoText} onChange={newTodoInputHandler} placeholder="new todo.." />
        <button onClick={addNewTodoHandler}>Add</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps)=>{
  const {todo} = state;
  return{
    todoItems: todo
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    addTodo: (body)=>{dispatch({type: 'add_todo', body: body})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
