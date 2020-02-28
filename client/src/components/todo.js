import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';

import {fetchTodo} from '../requests/fetchApi'
import {todoCommit} from '../actions/getDataActions'
import {dataStatus} from '../actions/dataStatusActions'
import {GET_TODO_REQUESTED, GET_TODO_SUCCEEDED, GET_TODO_FAILED} from '../requests/fetchState'

function Todo(props){

  const [fetchedTodo, setFetchedTodo] = useState('');
  const [todoItems, setTodoItems] = useState('');

  // set dataStatus
  // get data after the first render
  useEffect(()=>{
      props.todoDataStatus(GET_TODO_REQUESTED)
      fetchTodo().then((result)=>{
        props.todoDataStatus(GET_TODO_SUCCEEDED)
        props.todoCommit({body: result})
    })
    .catch((err)=>{
      // handle error here
    })
  }, [])

  // update data when ever store is updated and not an empty array
  useEffect(()=>{
    (props.todo != [] && props.loader == false && props.err == false) && setFetchedTodo(props.todo) ;
  }, [props.todo])

  // map data when ever fetchedTodo is updated
  useEffect(()=>{
    const renderTodo = Array.from(fetchedTodo).reverse().map((item)=>{
      return <li key={item.id} id={item.id} onClick={handleJumpItemToList}>{item.body}</li>
    })
    setTodoItems(renderTodo)
  }, [fetchedTodo])

  function handleJumpItemToList(e){
    console.log(e.target.id + "\n" + e.target.innerText);
  }

  return(
    <div id="todo-container">
      <p className="container-title red-title">Todo</p>
      <ul id="todo-list">
        {(props.loader) ? <div><div id='spinner'></div> <p style={{color: 'gray'}}>fetching data..</p></div> : todoItems}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps)=>{
  const {todo, loader, err} = state;
  return{
    todo: todo,
    loader: loader.todo,
    err: err.todo
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    todoCommit: (data)=>{ dispatch(todoCommit(data)) },
    todoDataStatus: (data)=>{ dispatch(dataStatus(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
