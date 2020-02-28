import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchInprogress} from '../requests/fetchApi'
import {inprogressCommit} from '../actions/getDataActions'
import {dataStatus} from '../actions/dataStatusActions'
import {GET_INPROGRESS_REQUESTED, GET_INPROGRESS_SUCCEEDED, GET_INPROGRESS_FAILED} from '../requests/fetchState'

function InProgress(props){

  const [fetchedInprogress, setFetchedInprogress] = useState('')
  const [inProgress, setInProgress] = useState('')

  useEffect(()=>{
    props.inprogressDataStatus(GET_INPROGRESS_REQUESTED)
    const inprogresss = fetchInprogress().then((result)=>{
      props.inprogressDataStatus(GET_INPROGRESS_SUCCEEDED)
      props.inprogressCommit({body: result})
    })
  }, [])

  useEffect(()=>{
    (props.inprogress != [] && props.loader == false && props.err == false) && setFetchedInprogress(props.inprogress);
  }, [props.inprogress])

  useEffect(()=>{
    const data = Array.from(fetchedInprogress).map((item)=>{
      return <li key={item.id}>{item.body}</li>
    })
    setInProgress(data)
  }, [fetchedInprogress])


  return(
    <div id="inprogress-container">
      <p className="container-title orange-title">InProgress</p>
      <ul id="inprogress-list">
        {(props.loader)? <div><div id="spinner"></div> <p style={{color: 'gray'}}>fetching data..</p></div> : inProgress}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps)=>{
  const {inprogress, loader, err} = state;
  return{
    inprogress: inprogress,
    loader: loader.inprogress,
    err: err.inprogress
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    inprogressCommit: (data)=>{dispatch(inprogressCommit(data))},
    inprogressDataStatus: (data)=>{ dispatch(dataStatus(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InProgress)
