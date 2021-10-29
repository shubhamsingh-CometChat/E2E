const initialState={}
const UserDetail=(state,action)=>{
    state=state||initialState
    switch(action.type){
        case 'addDetail':
            localStorage.setItem('userDetail',JSON.stringify(action.payload))
            return action.payload
        case 'removeDetail':
            localStorage.removeItem('userDetail')
            return {}
        default:
            return state
    }
}
export default UserDetail