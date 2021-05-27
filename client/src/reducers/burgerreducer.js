const reducer = (state= {ingredients : {salad:0,cheese:0,bacon:0,meat:0}, price : 0}, action) => {

  if(action.type==='count'){
    const prices = [10, 20, 50, 60, 10, 10, 40, 5, 5, 10];
    let price = 0;
    let count =0;
    Object.keys(action.payload).forEach(function(keys){
      price += action.payload[keys]*prices[count];
      count++;
    })
    return {...state, ingredients : action.payload, price : price}
  }

  

  return state;
}

export default reducer;
