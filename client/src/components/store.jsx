import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shopItems, updateItem, addToCart } from '../actions/index';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Shop from 'material-ui/svg-icons/action/store';
import Cart from './cart.jsx';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackbar: false,
      message: '',
      menusnack: false
    };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuSnack = this.handleMenuSnack.bind(this);
  }

  componentWillMount() {
     axios.get('/shopitems').
     then((res) => {
       this.props.dispatch(shopItems(res.data));
     });
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleTouchTap(value) {
    if(value) {
      this.setState({snackbar: true});
    }
  };

  handleRequestClose() {
    this.setState({snackbar: false});
  };

  handleMenuSnack(message){
    console.log(message);
    this.setState({
      menusnack: true,
      message: message
    })
  }

  handleMenuClose() {
    this.setState({
      menusnack: false,
      message: ''
    });
  };

  updateQuantity(index, action) {
    var obj = this.props.shopItems.shopItems[index];
    if(obj['quantityRemaining'] > 0) {
      obj['quantityRemaining'] = obj['quantityRemaining'] + action;
      this.props.dispatch(updateItem(index, obj));
      if(this.props.shopItems.cartItems[obj["itemName"]]){
        var item = this.props.shopItems.cartItems[obj["itemName"]];
        item.quantity = item.quantity + 1;
        this.props.dispatch(addToCart(item, obj["itemName"]));
      } else {
          var item = {
            "index": index,
            "price": obj["price"],
            "quantity": 1
          }
          this.props.dispatch(addToCart(item, obj["itemName"]));
      }
    }
  }

  storeRender() {
    const style = {
      name: {
        fontFamily: `sans-serif`,
      },
      images: {
        marginLeft: 20,
        width: 150,
        height: 150,
      },
      button: {
        width: `100`,
      },
      gridTile: {
        backgroundColor: `#FAFAFA`,
        borderRadius: `4px`,
        border: `1px solid black`,
        marginTop: `10px`,
        zIndex: `9999`
      }
    }

    if(!this.props.shopItems.shopItems) {
      return(
        <div>loading store...</div>
      )
    }

    return this.props.shopItems.shopItems.map((value, i) => {
      return (
        <GridTile
          key={value.imgSrc}
          title={`$` + value.price.toFixed(2)}
          titleStyle={style.name}
          subtitle={`Quantity: ` + value.quantityRemaining}
          subtitleStyle={style.name}
          style={style.gridTile}
          actionIcon={
            <div>
              <div style={style.button}>
                <RaisedButton onTouchTap={() => this.handleTouchTap(value.quantityRemaining)} icon={<AddShoppingCart />} onClick={(e) => this.updateQuantity(i, -1)} />
              </div>
              <Snackbar
                open={this.state.snackbar}
                message="Added to Cart!"
                autoHideDuration={750}
                onRequestClose={this.handleRequestClose}
              />
            </div>
          }
        >
          <h2 style={style.name}>{value.itemName}</h2>
          <img style={style.images} src={value.imgSrc} />
        </GridTile>
      )
    });
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 400,
        height: 800,
        overflowY: 'auto',
      },
      appBar: {
        top: '0',
        left: '30%',
        right: '0',
        width: '40%',
        height: 'inherit',
        backgroundColor: `#FAFAFA`,
      },
      cart: {
        color: `black`
      }
    };

    return (
      <div>
        <AppBar
          title={<Shop />}
          style={styles.appBar}
          showMenuIconButton={false}
          onRightIconButtonTouchTap={this.handleToggle}
          iconElementRight={<FontIcon style={styles.cart}><IconButton><ShoppingCart style={styles.cart}/></IconButton></FontIcon>}
        />
        <Drawer
          width={300}
          docked={false}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <div>
          <Cart snack={this.handleMenuSnack}/>
             <Snackbar
              open={this.state.menusnack}
              message={this.state.message}
              autoHideDuration={1000}
              onRequestClose={() => this.handleMenuClose()}
            />
        </div>
        </Drawer>
        <div style={styles.root}>
          <GridList
            cellHeight={250}
            style={styles.gridList}
            >
            {this.storeRender()}
          </GridList>
        </div>
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
