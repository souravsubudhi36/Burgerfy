const reducer = (state = {cartbutton: false}, action) => {
  if(action.type==='cartbuttonclickedforward'){
    return {...state, cartbutton : true}
  }
  if(action.type ==='cartbuttonclickedback'){
    return {...state, cartbutton : false}
  }




  return state;
}

export default reducer;
