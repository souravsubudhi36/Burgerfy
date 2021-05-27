import React from 'react';
import {connect} from 'react-redux';
import data from '../data';
import "./cart.css";
import * as actions from '../../actions/actions';


const cart = (props) => {
  let checkoutprice = 0;
  props.cart.forEach(function(order){
    checkoutprice += (order.quantity+1)*data.burgers[order.code].price;
  })
  props.customcart.forEach(function(order){
    checkoutprice += order.quantity*order.price;
  })






  let checkoutbutton = <button disabled className='cobutton'>Login to Continue</button>;

    let disabled = false;
    if(checkoutprice === 0){
      disabled = true;
    }



if(props.token !== 'false'){
  checkoutbutton = <button onClick={() => props.cont(checkoutprice)} className='cobutton' disabled={disabled}>Continue</button>
}
if(props.token !== 'false' && props.btn === true){
  checkoutbutton = null;
}

let hrrr = <hr />;
if(props.cart.length === 0){
  hrrr = null;
}

  return (
    <div>
      <div className='cartmainheader'>Cart</div>
      <hr />

      <div className='container splc'>
        <div className='row addmargin'>
          <div className ='col-5 cartsubheader '>Item</div>
          <div className ='col-4 cartsubheader gor'>Quantity</div>
          <div className ='col-2 cartsubheader gor'>Price</div>

        </div>
      </div>

      <div className='container splc'>

        {hrrr}

    {props.cart.map(function(order){
      return(
        <div key={order.code} className='row singleordercart'>
          <div className='col-2 col-md-1 aa bb'><div style={{background:`url(${data.burgers[order.code].pic})`, backgroundSize:'cover', backgroundPosition : 'center'}} className='cartpic'/></div>
          <div className='col-6 col-md-7 subtext'><strong>{data.burgers[order.code].name}</strong> <br /> {data.burgers[order.code].ingredients}</div>
          <div className='col-1 subtext gor aa gol'>{order.quantity+1}</div>
          <div className='col-2 subtext gor nn'>{data.burgers[order.code].price*(order.quantity+1)}</div>
          <div className='col-1 subtext aa kk'><button onClick={() =>  props.rmtocart(order.code)}><i className="fas fa-times"></i></button></div>



        </div>
      );
    })}

<hr />

    {props.customcart.map(function(order){
      return(<div key={order.description} className='row singleordercart'>
        <div className='col-2 col-md-1 aa bb'><div className='customimg'></div></div>
          <div className='col-6 col-md-7 subtext'><strong>Custom</strong> <br /> {order.description}</div>
          <div className='col-1 subtext gor aa gol'>{order.quantity}</div>
          <div className='col-2 subtext gor nn'>{order.price*(order.quantity)}</div>
          <div className='col-1 subtext aa kk'><button onClick={() => props.rmtoccart(order.description)}><i className="fas fa-times"></i></button></div>

      </div>
    );
    })}

    <div className='row qwert'>
      <div className='col-9 gor subtext abc'><strong>Total Price:</strong></div>
      <div className='col-2 subtext gor abc'><strong>{checkoutprice}</strong></div>

    </div>

    <div className='cobtn'>{checkoutbutton}</div>

    </div>




    </div>
  )
}

const mapstate = state => {
  return {
    cart : state.store.cart,
    customcart : state.store.customcart,
    token : state.auth.token
  }
}

export default connect(mapstate,actions)(cart);
