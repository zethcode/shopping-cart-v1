import React from 'react'

const Header = ({ cartItemsCount }) => {
    return (
        <header className="row center block">
            <div>
                <a href="#">
                    <h1>ZEC Shopping</h1>
                </a>
            </div>
            <div>
                <a href="/cart">
                    Cart {' '} 
                    {cartItemsCount && (
                        <button className="badge">{cartItemsCount}</button>
                    )}
                </a> <a href="/signin">Sign In</a>
            </div>
        </header>
    )
}

export default Header
