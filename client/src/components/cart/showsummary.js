import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import data from '../data';
import * as actions from '../../actions/actions';
import './cart.css';

 const ss = (props) => {
   let address = null;
if(props.chosen === null){
  address = (
    <div className='selectaddress container gor goll'>
      <div className='subtextpro'>Delivery Address</div>
      <strong>
    <div>{props.values.address}</div>
    <div>{props.values.city}</div>
    <div>{props.values.state}</div>
    <div>{props.values.pincode}</div>
    <div>{props.values.phone}</div>
</strong>
    </div>
  )
} else {
  address = (
    <div className='selectaddress container gor goll'>
      <div className='subtextpro'>Delivery Address</div>
      <strong>
    <div>{props.chosen.address}</div>
    <div>{props.chosen.city}</div>
    <div>{props.chosen.state}</div>
    <div>{props.chosen.pincode}</div>
    <div>{props.chosen.phone}</div>
    </strong>

    </div>
  )
}

let cart = (
  <div className='container'>

    <div className='row'>
      <div className='col-7 subtextpro'>Item</div>
      <div className='col-5 subtextpro gor'>Quantity</div>
    </div>
  {props.cart.map(function(order){
    return(
      <div key={order.code} className='row singleordercart qw'>

        <div className='col-9 subtext jj'><strong>{data.burgers[order.code].name}</strong> : {data.burgers[order.code].ingredients}</div>
        <div className='col-3 subtext gor jj'>{order.quantity+1}</div>

      </div>
    );
  })}

  {props.customcart.map(function(order){
    return(<div key={order.description} className='row singleordercart qw'>

      <div className='col-9 subtext jj'><strong>Custom</strong> : {order.description}</div>
      <div className='col-3 subtext gor jj'>{order.quantity}</div>

    </div>);
  })}



  </div>
);
let butt = <button className='btn btn-lg btn-success' style={{float:'right'}} onClick={() => props.postorder(props.cart, props.customcart, props.price,props.values, props.token, props.history)}>Order ({props.price})</button>;
if(props.chosen){
  butt = <button className='btn btn-lg btn-success' style={{float:'right'}} onClick={() => props.postorder(props.cart, props.customcart, props.price,props.chosen, props.token, props.history)}>Order ({props.price})</button>
}

  return (


    <div>
      <div className='cartmainheader addmargin'>Order Summary</div>

    <div className='container'>
      <div className='row'>
        <div className='col-lg-8 col-12 addmargin'>
          {cart}
        </div>
        <div className='col-lg-4 col-12 addmargin'>
          {address}
        </div>
        <div className='col-12'>
          <button className='btn btn-lg btn-warning' onClick={props.back}>Back</button>
          {butt}
        </div>
      </div>
    </div>


    </div>
  )
}

const mapstatetoprops=(state)=>{
  return {
    values : state.form.cart.values,
    cart : state.store.cart,
    customcart : state.store.customcart,
    token : state.auth.token
  }
}
export default connect(mapstatetoprops,actions)(withRouter(ss));
