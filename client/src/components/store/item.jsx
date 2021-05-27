import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import './store.css';

const item = (props) => {
  let pic = props.pic;
  if(!pic){
    pic = '/burger-top.png';
  }
  return (
    <div className='item'>
      <div style={{background:`url(${pic})`, backgroundSize:'cover', backgroundPosition:'center'}} className='itempic'></div>
      <div><strong>{props.name}</strong></div>
      <div className='storeingred'>{props.ingredients}</div>
      <div className='floating'>
      <div><i className="fas fa-rupee-sign"> </i> <strong>{props.price}</strong></div>
      <button onClick={() => props.addtocart(props.code)} >Add to cart <i className="fas fa-shopping-cart"></i></button>
      </div>
    </div>
  )
}


export default connect(null,actions)(item);
