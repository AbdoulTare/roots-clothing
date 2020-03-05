import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartDropdownContainer, 
  CartdropdownButton, 
  EmptyMessageContainer, 
  CartItemsContainer } from './cart-dropdown.styles';


import CartItem from "../cart-item/cart-item.component";
import { selectCartItems} from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
    {
        cartItems.length ? 
        cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem}/>
            )) : (
            <EmptyMessageContainer> Your cart is empty</EmptyMessageContainer>)
        }
    </CartItemsContainer>
    <CartdropdownButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
  }}
  > GO TO CHECKOUT 
    </CartdropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
