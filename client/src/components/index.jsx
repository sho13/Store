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
      //  console.log(res.data)
       this.props.dispatch(shopItems(res.data))
     })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <h1>Shop</h1>
        <p></p>
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
