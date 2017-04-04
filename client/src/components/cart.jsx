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
  }

  deleteItem(itemName) {
    var cart = this.props.shopItems.cartItems
    this.updateQuantity(itemName, cart[itemName]["quantity"]);
    console.log('cart::', cart)
    delete cart[itemName];
    console.log('cart::', cart)
    this.props.dispatch(addToCart(cart));
  }

  updateQuantity(index, action) {
    var obj = this.props.shopItems.shopItems;
    for(var i = 0; i < obj.length; i++) {
      if(obj[i]['itemName'] === index) {
        if(obj[i]['quantityRemaining'] > 0) {
          obj[i]['quantityRemaining'] = obj[i]['quantityRemaining'] + action
          this.props.dispatch(updateItem(index, obj));
          var item = this.props.shopItems.cartItems[obj[i]["itemName"]]
          item.quantity += -(action)
          if(item.quantity === 0) {
            console.log('DELETE THIS BITCH')
            this.deleteItem(item);
          }
        } else if(obj[i]['quantityRemaining'] === 0) {
            obj[i]['quantityRemaining'] = 'Sold out'
            this.props.dispatch(updateItem(index, obj));
        }
      }
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
          <p>Price: {this.props.shopItems.cartItems[item]['price']}</p>
          <span><p>Quantity: {this.props.shopItems.cartItems[item]['quantity']}</p></span>
          <span><button onClick={(e) => this.updateQuantity(item, -1)}> Increase Quantity </button></span>
          <span><button onClick={(e) => this.updateQuantity(item, 1)}> Decrease Quantity </button></span>
          <span><button onClick={(e) => this.deleteItem(item)}>Remove Item</button></span>
        </div>
      )
    })
  }

  totalCost() {
    return Object.keys(this.props.shopItems.cartItems).map((value) => {
        return this.props.shopItems.cartItems[value]['price'] * this.props.shopItems.cartItems[value]['quantity'];
      }).reduce((a,b) => {
        return a + b;
      }, 0).toFixed(2);
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.insideCart()}
        <p>Total: ${this.totalCost()}</p>
        <button onClick={() => checkout()}>Checkout</button>
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
