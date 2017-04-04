import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shopItems, updateItem, addToCart } from '../actions/index';
import axios from 'axios'
import Cart from './cart.jsx'


class Store extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentWillMount() {
     axios.get('/shopitems').
     then((res) => {
       const data = res.data.map((val) => {
         return {
           itemName: val.itemName,
           imgSrc: val.imgSrc,
           price: val.price,
           quantityRemaining: val.quantityRemaining,
           quantity: 0,
         }
       })
       console.log(data);
       this.props.dispatch(shopItems(res.data))
     })
  }

  updateQuantity(index, action) {
    var obj = this.props.shopItems.shopItems[index];
    console.log(obj);
    if(obj['quantityRemaining'] > 0) {
      obj['quantityRemaining'] = obj['quantityRemaining'] + action
      this.props.dispatch(updateItem(index, obj));
      obj['quantity'] += 1;
      this.props.dispatch(addToCart(obj))
    } else if(obj['quantityRemaining'] === 0) {
      obj['quantityRemaining'] = 'Sold out'
      this.props.dispatch(updateItem(index, obj));
    }
  }

  storeRender() {
    if(!this.props.shopItems.shopItems) {
      return(
        <div>loading store...</div>
      )
    }

    return this.props.shopItems.shopItems.map((value, i) => {
      return (
        <div>
          <h2>{value.itemName}</h2>
          <img src={value.imgSrc} />
          <p>${value.price}</p>
          <p>Remaining: {value.quantityRemaining}</p>
          <button onClick={(e) => this.updateQuantity(i, -1)}>Add to Cart</button>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Shop</h1>
        <Cart />
        {this.storeRender()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems,
    cartItems: state.cartItems
  };
}


export default connect(mapStateToProps)(Store);