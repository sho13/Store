import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { shopItems} from '../actions/index';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  componentDidMount() {
    this.props.shopItems();
    console.log(this.props.shopItems);
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems
  };
}

export default connect(mapStateToProps);
