import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import Spinner from '../spinner/spinner';
import './cart.css';

class showaddress extends Component {

state = {
  res : null
}

  async componentDidMount() {
    const res= await axios.get('/api/address', {headers: {'authorization': this.props.token}});
    
    this.setState({res : res.data.reverse()});
  }

  render() {
    let addresses = <div className='spinnerdiv'><Spinner /></div>;
    if(this.state.res !== null){
      addresses = (
        <div>
          {this.state.res.map((addr) => {
            return <div key={addr._id} className='selectaddress'>

              <div>{addr.address}</div>
              <div>{addr.city}</div>
              <div>{addr.state}</div>
              <div>{addr.pincode}</div>
              <div>{addr.phone}</div>
              <button  className='btn btn-md btn-success' onClick={() => this.props.chooseaddress(addr)}>Choose This address</button>
              <button className='btn btn-md btn-danger' onClick={() => this.props.deleteaddress(addr._id)}>Delete</button>
              <hr />
            </div>
          })}
        </div>
      )
    }
    if (this.state.res && this.state.res.length === 0){
      addresses = <div className='subtext'>Please Enter a new Address</div>
    }

    let savenewaddressbutton = <button type='submit' className='btn btn-md btn-success'>Add New Address</button>;

    if(this.props.loadaddress === true){
      savenewaddressbutton = <div className='spinnerdiv'><Spinner /></div>
    }

  return(
<div>

  <div className='cartmainheader2'>Select Delivery Address</div>
  <hr className='addmargin'/>
  <div className='container'>
    <div className='row'>
      <div className='col-12 col-md-6'>
        {addresses}
      </div>
      <div className='col-12 col-md-6'>
        <form onSubmit={this.props.handleSubmit(this.props.cont)}>
          <Field
            name='address'
            component='input'
            placeholder='Locality'
            required
            className='form-control'
            />
          <Field
            name='city'
            component='input'
            required
            placeholder='City'
            className='form-control'
            />
          <Field
            name='state'
            component='input'
            required
            placeholder='State'
            className='form-control'
            />
          <Field
            name='pincode'
            component='input'
            required
            placeholder='Pincode'
            type='number'
            className='form-control'
            />
          <Field
            name='phone'
            component='input'
            required
            type="number"
            placeholder='Phone'
            className='form-control'
            />

          {savenewaddressbutton}

        </form>
      </div>
    </div>


<div><button onClick={this.props.back} className='btn-md btn btn-warning butoon'>Back</button></div>
  </div>


    </div>
  )
}
}


export default reduxForm({form:'cart', destroyOnUnmount: false})(showaddress);
