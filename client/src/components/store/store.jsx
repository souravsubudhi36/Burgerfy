import React, {Component} from 'react';
import Item from './item.jsx';
import data from '../data';
import './store.css'

class Store extends Component {
  render() {

    return(

      <div className='container'>

        <div className='storemainheader'>Choose Your  <i className="fas fa-heart"></i></div>

      <div className='rangeheader'>big..</div>
        <div className='row addsupamargin ss'>
          <div className='col-4 rangehighlight hl1'></div>
          <div className='col-8 rangemenu'>
            
            <div className='horizontalscroller'>
              {data.burgers.slice(0,4).map(function(burger){
                return <Item key={burger.code} price={burger.price} pic={burger.pic} name={burger.name} ingredients={burger.ingredients} code={burger.code}/>
              })}
            </div>
          </div>
        </div>

        <div className='rangeheader gor'>...huge</div>
        <div className='row addsupamargin ss'>

          <div className='col-8 rangemenugor'>
            <div className='horizontalscroller pls'>
              {data.burgers.slice(4,9).map(function(burger){
                return <Item key={burger.code} price={burger.price} pic={burger.pic} name={burger.name} ingredients={burger.ingredients} code={burger.code}/>
              })}
            </div>
          </div>
          <div className='col-4 rangehighlight hl2'></div>
        </div>

        <div className='rangeheader'>w!t@f#!*</div>
        <div className='row addsupamargin ss'>
          <div className='col-4 rangehighlight hl3'></div>
          <div className='col-8 rangemenu'>
            <div className='horizontalscroller'>
              {data.burgers.slice(9,13).map(function(burger){
                return <Item key={burger.code} price={burger.price} pic={burger.pic} name={burger.name} ingredients={burger.ingredients} code={burger.code}/>
              })}
            </div>
          </div>
        </div>

        <div className='rangeheader gor'>top it up!</div>
        <div className='row addsupamargin ss'>

          <div className='col-8 rangemenugor'>
            <div className='horizontalscroller'>
              {data.burgers.slice(13,17).map(function(burger){
                return <Item key={burger.code} price={burger.price} pic={burger.pic} name={burger.name} ingredients={burger.ingredients} code={burger.code}/>
              })}
            </div>
          </div>
          <div className='col-4 rangehighlight hl4'></div>
        </div>

      </div>

    )
  }
}


export default Store;
