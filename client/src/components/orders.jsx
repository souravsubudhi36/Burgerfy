import React,{Component} from 'react';
import axios from 'axios';
import data from './data';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import "./orders.css";
import Spinner from './spinner/spinner';

class Orders extends Component {

  state = {orders : false};

  async componentWillMount() {

    let orders = false;
    if(this.state.orders === false){
      orders = await axios.get('/api/order', {headers : {'authorization' : this.props.token}});

      this.setState({orders : orders.data.reverse()});
    }

  }

componentDidUpdate() {

  if(this.state.orders !== false){
    let i = 0;
    let fake =[];

    for(i ; i< this.state.orders.length; i++){
      fake.push('a');
    }
    const chevronbox = document.getElementsByClassName('chevron');
    const chevron = document.getElementsByClassName('fa-chevron-down');
    const addressbox = document.getElementsByClassName('addressbox');

    fake.forEach(function(cv, index){
      chevronbox[index].addEventListener('click', function() {
        chevron[index].classList.toggle('fa-chevron-up');
        addressbox[index].classList.toggle('extend');
      })
    })

  }
}



  render() {

let con = <div className='spinnerdivm'><Spinner /></div>
if(this.props.token === "false"){
  con = <Redirect to='/store' />
}

if(this.state.orders !== false){
  con = (<div className='container'>

          {this.state.orders.map(function(order){
            return(
              <div key={order._id} className='orderdiv'>

                <div className='container orderdivin'>

              <div className='row heading'>
                <div className='col-2 ordertext tac'>Quantity</div>
                <div className='col-7 ordertext padleft'>Item</div>
                <div className='col-3 ordertext tac'>Price</div>
              </div><div>
                {order.cart.map(function(cartorder){
                  return (
                    <div key={cartorder.code} className='row orderlettering'>
                      <div className='col-2 tac'>{cartorder.quantity+1} </div>
                      <div className='col-7 padleft'>{data.burgers[cartorder.code].name} - {data.burgers[cartorder.code].ingredients}</div>
                      <div className='col-3 tac'>{data.burgers[cartorder.code].price*(cartorder.quantity+1)}</div>
                    </div>
                  )
                })}
              </div>

              <hr />

              <div>
                {order.customcart.map(function(cartorder){
                  return (
                    <div key={cartorder.description} className='row orderlettering'>
                      <div className='col-2 tac'>{cartorder.quantity} </div>
                      <div className='col-7 padleft'>Custom - {cartorder.description}</div>
                      <div className='col-3 tac'>{cartorder.price*cartorder.quantity}</div>
                    </div>
                  );
                })}
              </div>

              <div className='addressbox'>
                <div className='aaa'>Delivery Address</div>
                <div>{order.address.address}</div>
                <div>{order.address.city}</div>
                <div>{order.address.state}</div>
                <div>{order.address.pincode}</div>
                <div>{order.address.phone}</div>
              </div>

              </div>

              <div className='arrowdiv container'>
                <div className='row'>
                <div className='col-2'></div>
                <div className='col-7 chevron padleft'><i className="fas fa-chevron-down"></i></div>
                <div className='col-3 ttlprice tac'><strong>{order.price}</strong></div>
                </div>
              </div>






            </div>
          );
          })}

        </div>)
}

if(this.state.orders.length === 0){
  con = <div className='sdf'>No Orders to show</div>
}

    return (

      <div>

        <div className='container'>
          <div className='maintextorder'>Orders</div>
        </div>

        {con}

      </div>
    )
  }
}

const mapstate = state => {
  return {
    token : state.auth.token
  }
}

export default connect(mapstate)(Orders);
