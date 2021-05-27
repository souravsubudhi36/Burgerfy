const reducer = (state = {cart : [], customcart : []}, action) => {

  if(action.type === 'addtocart'){
    let trigger = true;
    const copy = {...state, cart : [...state.cart], customcart : [...state.customcart]};
    copy.cart.forEach(function(order){
      if(order.code===action.payload){
        order.quantity ++;
        
        trigger = false;
        return copy;

      }
    });
    if(trigger){
      copy.cart.push({code : action.payload, quantity : 0});

      return copy;
    }

  }

  if(action.type === 'addtocartcustom'){
    let trigger = true;
    const copy = {...state, cart : [...state.cart], customcart : [...state.customcart]};
    copy.customcart.forEach(function(obj){
      if(obj.description === action.description){
        obj.quantity++;
        trigger= false;

        return copy;
      }
    })
    if(trigger){
      copy.customcart.push({description:action.description, price : action.price, quantity : 1});

      return copy;
    }

  }


  if(action.type === 'rmtocart'){
    const copy = {...state, cart : [...state.cart], customcart : [...state.customcart]};
    copy.cart.forEach(function(order){
      if(action.payload === order.code){
        copy.cart.splice(copy.cart.indexOf(order), 1);
      }
    })
    return copy;
  }


  if(action.type === 'rmtoccart'){
    const copy = {...state, cart : [...state.cart], customcart : [...state.customcart]};
    copy.customcart.forEach(function(order){
      if(action.payload === order.description){
        copy.customcart.splice(copy.customcart.indexOf(order), 1);
      }
    })
    return copy;
  }



  if(action.type==='cleanslate'){
    return {cart:[], customcart:[]};
  }
  return state;
}

export default reducer;
