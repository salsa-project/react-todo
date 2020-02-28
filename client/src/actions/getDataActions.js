const todoCommit = (data)=>{
  return {
    type: 'todo-data',
     body: data.body
  }
}
const inprogressCommit = (data)=>{
  return {
    type: 'inprogress-data',
     body: data.body
  }
}
const doneCommit = (data)=>{
  return {
    type: 'done-data',
     body: data.body
  }
}

export {todoCommit, inprogressCommit, doneCommit}
