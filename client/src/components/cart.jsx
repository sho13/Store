import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateItem, checkout, addToCart, removeFromCart } from '../actions/index.js'
import Style from '../style/style.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveFromCart from 'material-ui/svg-icons/action/remove-shopping-cart';
import AddButton from 'material-ui/svg-icons/content/add-circle';
import MinusButton from 'material-ui/svg-icons/content/remove-circle';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';


class Cart extends Component {
  constructor(props) {
    super(props);
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
      alert('Please add your items to cart!');
    } else {
      cart = {};
      this.props.dispatch(checkout(cart));
      alert('Thank you for shopping!');
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

      const iconButtonElement = (
        <IconButton
          touch={true}
          tooltip="more"
          tooltipPosition="bottom-left"
        >
          <MoreVertIcon color={grey400} />
        </IconButton>
      );
      let rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={(e) => this.updateQuantity(item, -1)}><AddButton /></MenuItem>
          <MenuItem onClick={(e) => this.updateQuantity(item, 1)}><MinusButton /></MenuItem>
          <MenuItem onClick={(e) => this.deleteItem(item, true)}><RemoveFromCart /></MenuItem>
        </IconMenu>
      );

      return (
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText={item}
          secondaryText={
            <p>
              <span style={{color:darkBlack}}>Price: ${this.props.shopItems.cartItems[item]['price'].toFixed(2)}</span> --
              Quantity: {this.props.shopItems.cartItems[item]['quantity']}
            </p>
          }
          secondaryTextLines={2}
          />

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
    const style = {
      text: {
        textAlign: `right`,
        marginRight: 10,
        fontFamily: `sans-serif`,
      },
      checkout: {
        textAlign: `right`,
        marginRight: 6,
      }
    }

    return (
      <div>
          <List>
            {this.insideCart()}
            <Divider inset={true} />
              <p style={style.text}>Total: $ {this.totalCost()}</p>
              <div style={style.checkout}>
                <RaisedButton onClick={(e) => this.checkout()} label="Checkout" />
              </div>
          </List>
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
