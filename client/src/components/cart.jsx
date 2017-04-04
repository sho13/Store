import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateItem, checkout, addToCart, removeFromCart } from '../actions/index.js'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = null;
    this.updateQuantity = this.updateQuantity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkout = this.checkOut.bind(this);
  }

  deleteItem(itemName, del) {
    var cart = this.props.shopItems.cartItems
    if(del) {
      this.updateQuantity(itemName, cart[itemName]["quantity"]);
    }
    delete cart[itemName];
    this.props.dispatch(removeFromCart(cart));
  }

  updateQuantity(item, action) {
    var obj = this.props.shopItems.shopItems;
    var cart = this.props.shopItems.cartItems;
    var index = this.props.shopItems.cartItems[item]['index'];

    if(obj[index]['quantityRemaining'] > 0 || action > 0) {
      obj[index]['quantityRemaining'] = obj[index]['quantityRemaining'] + action
      this.props.dispatch(updateItem(index, obj[index]));
      this.props.shopItems.cartItems[item]['quantity'] += -(action);
      if(this.props.shopItems.cartItems[item]['quantity'] === 0) {
        this.deleteItem(item);
      }
    }
  }

  checkOut() {
    var cart = this.props.shopItems.cartItems;
    if(Object.keys(cart).length === 0 && cart.constructor === Object){
      alert('Please add your items to cart!')
    } else {
      cart = {};
      this.props.dispatch(checkout(cart));
      alert('Thank you for shopping!')
    }
  }

  insideCart() {
    if(!this.props.shopItems.cartItems) {
      return (
        <div>
          <p>Loading cart</p>
        </div>
      )
    }
    return Object.keys(this.props.shopItems.cartItems).map(item => {
      return (
        <div>
          <h5>{item}</h5>
          <p>Price: ${this.props.shopItems.cartItems[item]['price'].toFixed(2)}</p>
          <span><p>Quantity: {this.props.shopItems.cartItems[item]['quantity']}</p></span>
          <span><button onClick={(e) => this.updateQuantity(item, -1)}> Increase Quantity </button></span>
          <span><button onClick={(e) => this.updateQuantity(item, 1)}> Decrease Quantity </button></span>
          <span><button onClick={(e) => this.deleteItem(item, true)}>Remove Item</button></span>
        </div>
      )
    })
  }

  totalCost() {
    return Object.keys(this.props.shopItems.cartItems).map((value) => {
        return this.props.shopItems.cartItems[value]['price'] * this.props.shopItems.cartItems[value]['quantity'];
      }).reduce((a,b) => {
        return a + b;
      }, 0)
      .toFixed(2);
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.insideCart()}
        <p>Total: ${this.totalCost()}</p>
        <button onClick={(e) => this.checkout()}>Checkout</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems,
    cartItems: state.cartItems
  }
}

export default connect(mapStateToProps)(Cart);
