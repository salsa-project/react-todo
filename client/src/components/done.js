import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchDone} from '../requests/fetchApi'
import {doneCommit} from '../actions/getDataActions'
import {dataStatus} from '../actions/dataStatusActions'
import {GET_DONE_REQUESTED, GET_DONE_SUCCEEDED, GET_DONE_FAILED} from '../requests/fetchState'

function Done(props){

  const [fetchedDone, setFetchedDone] = useState('');
  const [done, setDone] = useState('');

  useEffect(()=>{
    props.doneDataStatus(GET_DONE_REQUESTED);
    const dones = fetchDone().then((result)=>{
      props.doneDataStatus(GET_DONE_SUCCEEDED);
      props.doneCommit({body: result});
    })
  }, [])

  useEffect(()=>{
    (props.done != []) && setFetchedDone(props.done)
  }, [props.done])

  useEffect(()=>{
    const data = Array.from(fetchedDone).reverse().map((item)=>{
      return <li key={item.id}>{item.body}</li>
    })
    setDone(data)
  }, [fetchedDone])

  return(
    <div id="done-container">
      <p className="container-title green-title">Done</p>
      <ul id="done-list">
        {(props.loader)? <div><div id="spinner"></div> <p style={{color: 'gray'}}>fetching data..</p></div> : done}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps)=>{
  const {done, loader, err} = state;
  return{
    done: done,
    loader: loader.done,
    err: err.done
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    doneCommit: (data)=>{dispatch(doneCommit(data))},
    doneDataStatus: (data)=>{dispatch(dataStatus(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Done)
