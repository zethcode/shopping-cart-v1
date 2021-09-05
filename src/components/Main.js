import React from 'react'
import Product from './Product'

const Main = ({ products, addToCart }) => {
    return (
        <main className="block col-2">
            <h2>Products</h2>
            <div className="row">
                {products.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </main>
    )
}

export default Main
