import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

const Basket = ({ cartItems, addToCart, removeFromCart }) => {
    const itemsPrice = cartItems.reduce((accumalator, currentItem) => accumalator + currentItem.price * currentItem.qty, 0)
    const taxPrice = itemsPrice * 0.14
    const shippingPrice = itemsPrice > 10000 ? 0 : 200
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    return (
        <aside className="block col-1">
            <h2>Cart Items</h2>
            <div>
                {cartItems.length === 0 && <div>No items added to cart</div>}
            </div>
            {cartItems.map((item) => (
                <div key={item.id} className="row" > 
                    <div className="col-2" >{item.name}</div>
                    <div className="" >
                        <IconButton 
                            style={{backgroundColor: 'transparent'}}
                            color="secondary" 
                            aria-label="remove from cart" 
                            size="small"
                            onClick={() => removeFromCart(item.id)}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </div>
                    <div className="" >
                    <IconButton 
                        style={{backgroundColor: 'transparent'}}
                        color="primary" 
                        aria-label="add to cart" 
                        size="small"
                        onClick={() => {addToCart(item)}}>
                        <AddCircleIcon />
                    </IconButton>
                    </div>
                    <div className="col-1" >
                        {item.qty} x &#8369;{item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr/>
                    <div className="row">
                        <div className="col-1 text-left" >Items:</div>
                        <div className="col-1 text-right" >&#8369; {itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 text-left" >Tax:</div>
                        <div className="col-1 text-right" >&#8369; {taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 text-left" >Shipping:</div>
                        <div className="col-1 text-right" >&#8369; {shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 text-left" ><strong>Total:</strong></div>
                        <div className="col-1 text-right" ><strong>&#8369; {totalPrice.toFixed(2)}</strong></div>
                    </div>
                    <hr/>
                    <div className="row">
                        <Button 
                            variant="contained"
                            color="secondary"
                            onClick={() => alert('Implement Checkout')}>
                                Checkout
                        </Button>
                    </div>
                </>
            )}
        </aside>
    )
}

export default Basket
