

const initialState=false
const Login=(state,action)=>{
    state=state||JSON.parse(localStorage.getItem('login'))||initialState
    switch (action.type) {
        case 'login':
            localStorage.setItem('login',true)
            return true
        case 'logout':
            localStorage.clear()
            return false
        default:
            return state
    }
}

export default Login