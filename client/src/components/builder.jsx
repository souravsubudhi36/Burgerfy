import React, {Component} from 'react';
import "./builder.css";
import "./burger.css";
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

class Builder extends Component {

componentDidMount () {
  window.addHook();
  this.props.count();
  document.querySelector('#togglebutton').addEventListener('click', function() {
    document.getElementsByClassName('togglemenu')[0].classList.toggle('hidemenu');
    document.getElementsByClassName('togglemenu')[1].classList.toggle('hidemenu');
  })
}

  render() {
    let disabled = false;

    if(this.props.info.price === 0){
      disabled = true;
    }


    return (
      <div className='container'>
        <div className='row'>

          <div className='col-2'></div>
          <div className='col-10'>
            <div className='maintext'>
              <div>Price: {this.props.info.price}</div>
              <button
                className='buttonaddtocart'
                disabled={disabled}
                onClick={() => this.props.addtocartcustom(this.props.info.ingredients, this.props.info.price)}>
                Add to Cart <i className="fas fa-shopping-cart"></i>

              </button>

            </div>
          </div>

      <div className='col-1 traymain hideit'>

        <ul className='trayofingred'>
  <li className="draggable Salad"></li>
  <li className="draggable Cheese"></li>
  <li className="draggable Bacon"></li>
  <li className="draggable Meat"></li>
  <li className="draggable Onion"></li>


</ul>
      </div>
      <div className='col-1 traymain hideit'>

        <ul className='trayofingred'>

  <li className="draggable Tomato"></li>
  <li className="draggable Cutlet"></li>
  <li className="draggable Sauce"></li>
  <li className="draggable Mayo"></li>
  <li className="draggable Barbeque"></li>

</ul>
      </div>

      <div className='col-2 traymain hideitopp'>

        <ul className='trayofingred'>
          <div className='togglemenu'>
          <li className="draggable Salad"></li>
          <li className="draggable Cheese"></li>
          <li className="draggable Bacon"></li>
          <li className="draggable Meat"></li>
          <li className="draggable Onion"></li>
          </div>
          <div className ='togglemenu hidemenu'>
  <li className="draggable Tomato"></li>
  <li className="draggable Cutlet"></li>
  <li className="draggable Sauce"></li>
  <li className="draggable Mayo"></li>
  <li className="draggable Barbeque"></li>
  </div>
  <li id='togglebutton'></li>

</ul>
      </div>



      <div className='col-10'>

        <div className='BreadTop burgerbody'>
          <div className='Seeds1'></div>
          <div className='Seeds2'></div>
        </div>

          <ul id="sortable" className='burgerinside'>
          </ul>


        <div className='BreadBottom burgerbody'></div>
        <div className='maintext' style={{textAlign:'center',color: "#343a40"}}>Drag ingredients to the Burger!</div>



      </div>
      </div>
      </div>

    )
  }
}

const mapstate = (state) => {
  return {
    info : state.burger
  }
}
export default connect(mapstate, actions)(Builder);
