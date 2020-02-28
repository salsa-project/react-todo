
const fetchTodo = async ()=> {
  const call = await fetch('/todos');
  const response = await call.json();

  return response;
}

const fetchInprogress = async ()=> {
  const call = await fetch('/inprogress');
  const response = await call.json();

  return response;
}

const fetchDone = async ()=> {
  const call = await fetch('/done');
  const response = await call.json();

  return response;
}

export {
    fetchTodo,
    fetchInprogress,
    fetchDone
  }
