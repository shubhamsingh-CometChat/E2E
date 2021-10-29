import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./Reducer";
const  Thunk=store=>next=>action=>{
    if(typeof action==='function'){
        return action(store.dispatch,store.getState)
    }
    else{
        return next(action)
    }
}
const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
export default createStore(reducer,composer(applyMiddleware(Thunk)))