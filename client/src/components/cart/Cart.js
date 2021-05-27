import React, { Component } from "react";
import Currentorder from "./showcurrentorder";
import Showaddress from './showaddress';
import Showsummary from './showsummary';
import Showundeletableorder from './showundeletableorder';
import {reduxForm} from 'redux-form';
import axios from 'axios'
import {connect} from 'react-redux';



class Maincart extends Component {

  state = {
    showsummary : false,
    showaddress : false,
    nodelete : false,
    price:0,
    chosen : null,
    loadingnewaddress : false
  }

continue = async(value) => {
  this.setState({loadingnewaddress : true});
  await axios.post('/api/saveaddress', value, {headers : {'authorization': this.props.token}});
  this.setState({showsummary:true, loadingnewaddress : false});
}

storeprice = (price) => {

  this.setState({showaddress:true, nodelete: true, price:price})
}

chooseaddress = addr => {
  this.setState({chosen:addr, showsummary:true });
}

deleteaddress = async(id) => {

  const res = await axios.post('/api/deleteaddress',{id :id}, {headers : {'authorization': this.props.token}});
  this.setState({showaddress:false});
  this.setState({showaddress:true});

}


  render() {

    let showaddress = null;
    if(this.state.showaddress && !this.state.showsummary){
      showaddress = <Showaddress cont={this.continue} back={() => this.setState({showaddress:false, nodelete:false})} token={this.props.token} chooseaddress={this.chooseaddress} deleteaddress={this.deleteaddress} loadaddress={this.state.loadingnewaddress}/>;
    }

    let showsummary = null;
    if(this.state.showsummary){
      showsummary = <Showsummary back={() => this.setState({showsummary:false,showaddress:true, chosen:null})} price={this.state.price} chosen={this.state.chosen}/>
    }

    let currentorder = null;
    if(!this.state.nodelete && !this.state.showsummary){
      currentorder = <Currentorder cont={this.storeprice} btn={this.state.showaddress}/>
    }


    if(this.state.nodelete && !this.state.showsummary){
      currentorder = <Showundeletableorder />
    }

    return (
      <div>
        {currentorder}
        {showaddress}
        {showsummary}
      </div>
    );
  }
}

const mapstate = state => {
  return {
    token : state.auth.token
  }
}

export default reduxForm({form:"cart"})(connect(mapstate)(Maincart));
