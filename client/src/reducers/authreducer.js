const reducer =  (state = {token : localStorage.getItem('token'), name : "User"}, action) => {

  if(action.type==='loggedin'){
    localStorage.setItem("token", action.payload);
    return {...state, token : action.payload}
  }
  if(action.type==="logout"){
    localStorage.setItem('token', false);
    return {...state, token : "false", name : "User"}
  }
  if(action.type==='getuser'){
    
    return {...state, name : action.payload.name};
  }

  return state;
}


export default reducer;
