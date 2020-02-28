import {fetchTodo, fetchInprogress, fetchDone} from '../requests/fetchApi'

const initState = {
  todo: [],
  inprogress: [],
  done: [],
  loader: {
    todo: false,
    inprogress: false,
    done: false
  },
  err: {
    todo: false,
    inprogress: false,
    done: false
  }
};

const rootReducer = (state = initState, action)=>{
  console.log(action);
  switch(action.type){
    //data status part
    case 'gettodorequested':
      return{
        ...state,
        loader: {...state.loader, todo: true},
        err: {...state.err, todo: false}
      }
      break;
      case 'gettodosucceeded':
        return{
          ...state,
          loader: {...state.loader, todo: false},
          err: {...state.err, todo: false}
        }
        break;
      case 'getinprogressrequested':
        return{
          ...state,
          loader: {...state.loader, inprogress: true},
          err: {...state.err, todo: false}
        }
        break;
      case 'getinprogresssucceeded':
        return{
        ...state,
        loader: {...state.loader, inprogress: false},
        err: {...state.err, todo: false}
        }
        break;
      case 'getdonerequested':
        return{
          ...state,
          loader: {...state.loader, done: true},
          err: {...state.err, todo: false}
        }
        break;
      case 'getdonesucceeded':
        return{
        ...state,
        loader: {...state.loader, done: false},
        err: {...state.err, todo: false}
        }
        break;

    case 'todo-data':
      return{
        ...state,
        todo: action.body
      }
      break;
    case 'inprogress-data':
      return{
        ...state,
        inprogress: action.body
      }
      break;
    case 'done-data':
      return{
        ...state,
        done: action.body
      }
      break;
    case 'add_todo':
      return{
        ...state,
        todo: [...state.todo, {id: action.body.item_id, body: action.body.data}]
      }
      break;

    default:
      return state;
  }

}

export default rootReducer
