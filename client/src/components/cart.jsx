import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateItem, checkout } from '../actions/index.js'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = null;
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateQuantity(index, action) {
    var obj = this.props.shopItems.shopItems[index];
    if(obj['quantityRemaining'] > 0) {
      obj['quantityRemaining'] = obj['quantityRemaining'] + action
      this.props.dispatch(updateItem(index, obj));
    } else if(obj['quantityRemaining'] === 0) {
      obj['quantityRemaining'] = 'Sold out'
      this.props.dispatch(updateItem(index, obj));
    }
  }

  insideCart() {
    return(
      <div>
        <button onClick={(e, i) => updateQuantity(i, -1)}> Increase Quantity </button>
        <button onClick={(e, i) => updateQuantity(i, 1)}> Decrease Quantity </button>
      </div>
    )
  }

  render() {
    console.log(this.props.shopItems);
    return (
      <div>
        <h1>Cart</h1>
        {}
        <p>Total: </p>
        <button onClick={() => checkout()}>Checkout</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems
  }
}

export default connect(mapStateToProps)(Cart);
