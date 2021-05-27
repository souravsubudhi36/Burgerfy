import React from 'react';
import {connect} from 'react-redux';
import data from '../data';
import './cart.css';


const cart = (props) => {
  let checkoutprice = 0;
  props.cart.forEach(function(order){
    checkoutprice += (order.quantity+1)*data.burgers[order.code].price;
  })
  props.customcart.forEach(function(order){
    checkoutprice += order.quantity*order.price;
  })

  return (
    <div>
      <div className='cartmainheader'>Cart</div>

        <div className='container splc'>
          <div className='row addmargin'>
            <div className ='col-6 cartsubheader '>Item</div>
            <div className ='col-3 cartsubheader gor'>Quantity</div>
            <div className ='col-2 cartsubheader gor'>Price</div>

          </div>
        </div>

        <div className='container splc'>

    {props.cart.map(function(order){
      return(
        <div key={order.code} className='row singleordercart'>
          <div className='col-2 col-md-1 aa bb'><div style={{background:`url(${data.burgers[order.code].pic})`, backgroundSize:'cover', backgroundPosition : 'center'}} className='cartpic'/></div>
          <div className='col-6 col-md-7 subtext'><strong>{data.burgers[order.code].name}</strong> <br /> {data.burgers[order.code].ingredients}</div>
          <div className='col-1 subtext gor'>{order.quantity+1}</div>
          <div className='col-2 subtext gor'>{data.burgers[order.code].price*(order.quantity+1)}</div>
        </div>
      );
    })}

    {props.customcart.map(function(order){
      return(<div key={order.description} className='row singleordercart'>
      <div className='col-2 col-md-1 aa bb'><div className='customimg'></div></div>
        <div className='col-6 col-md-7 subtext'><strong>Custom</strong> <br /> {order.description}</div>
        <div className='col-1 subtext gor'>{order.quantity}</div>
        <div className='col-2 subtext gor'>{order.price*(order.quantity)}</div>
      </div>);
    })}

    <div className='row'>
      <div className='col-9 gor subtext abc'><strong>Total Price:</strong></div>
      <div className='col-2 subtext gor abc'><strong>{checkoutprice}</strong></div>

    </div>

    </div>
    </div>
  );
}

const mapstate = state => {
  return {
    cart : state.store.cart,
    customcart : state.store.customcart
  }
}

export default connect(mapstate)(cart);
