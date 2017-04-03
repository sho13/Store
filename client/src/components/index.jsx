import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shopItems } from '../actions/index';
import axios from 'axios'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentWillMount() {
     axios.get('/shopitems').
     then((res) => {
       this.props.dispatch(shopItems(res.data))
     })
  }

  storeRender() {
    if(!this.props.shopItems.shopItems) {
      return(
        <div>loading store...</div>
      )
    }
    let shopItems = this.props.shopItems.shopItems
    return shopItems.map((value, i) => {
      return (
        <div>
          <h2>{value.itemName}</h2>
          <img src={value.imgSrc} />
          <p>${value.price}</p>
          <p>Remaining: {value.quantityRemaining}</p>
          <button>Add to Cart</button>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Shop</h1>
        {this.storeRender()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems
  };
}


export default connect(mapStateToProps)(Index);
