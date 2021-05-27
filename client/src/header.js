import React, {Component} from 'react';
import * as actions from './actions/actions';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './header.css';

class header extends Component {

componentWillMount() {
  if(this.props.login.token === null){
    this.props.logout(this.props.history);
  }
}

componentDidMount() {
  // When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");
var brand = document.getElementById('brand');
var topbar = document.getElementById('topbar');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    brand.classList.add('expandbrand');
    topbar.classList.add('extendmargin');
  } else {
    navbar.classList.remove("sticky");
    topbar.classList.remove('extendmargin');
    brand.classList.remove('expandbrand');
  }
}
}

  render() {



    if(this.props.login.token !== "false" && this.props.login.name === "User"){
      this.props.getuser(this.props.login.token);
    }




    let content = (<ul className='navbar-nav'>

      <li className="nav-item ">
        <a className="nav-link" onClick={this.props.loginSignup}>Login With Google</a>
      </li>
    </ul>);

    if (this.props.login.token !== "false") {
      content = (<ul className='navbar-nav'>

        <li className="nav-item dropdown abchideopp">
        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.login.name}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/orders">Orders</Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={() => this.props.logout(this.props.history)}>Logout</a>
        </div>
      </li>
      <div className='abchide'>
      <li className="nav-item ">
        <a className="nav-link disabled">{this.props.login.name}</a>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to='/orders'>Orders</Link>
      </li>


      <li className="nav-item ">
        <a className="nav-link" onClick={() => this.props.logout(this.props.history)}>Logout</a>
      </li>
      </div>
      </ul>);


    }






    return (
      <div>

      <nav className="navbar navbar-expand navbar-light bg-light headernavtop" id='topbar'>
        <div className='container'>
  <Link className="navbar-brand" to="/">Burgerfy</Link>



    <ul className="navbar-nav mr-auto hideitnav">
      <li className="nav-item ">
        <Link className="nav-link" to="/store">Menu</Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/builder">Builder</Link>
      </li>


    </ul>
    {content}


  </div>

</nav>

<nav className="navbar navbar-expand navbar-light bg-dark hideitnavopp" id='navbar'>
  <div className='container'>

<Link className="navbar-brand" to="/" id='brand'>Burgerfy</Link>


<ul className="navbar-nav nav-expand-nav">
<li className="nav-item nav-store">
  <Link className="nav-link" to="/store">Menu</Link>
</li>
<li className="nav-item nav-builder">
  <Link className="nav-link " to="/builder">Builder</Link>
</li>
<li className="nav-item nav-cart">
  <Link className="nav-link " to="/cart">Cart({this.props.carts.cart.length+this.props.carts.customcart.length})</Link>
</li>


</ul>



</div>

</nav>

</div>





    )
  }
}

const mapstate = (state) => {
  return {
    login : state.auth,
    ui : state.ui,
    carts : state.store
  }
}

export default connect(mapstate,actions)(withRouter(header));
