import { Button, Typography } from '@material-ui/core'


const Product = ({ product, addToCart }) => {
    return (
        <div>
            <div>
                <img className="small" src={product.image} alt={product.name} />
                <Typography>{product.name}</Typography>
                <div>{product.currency} {product.price}</div>
            </div>
            <div>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => addToCart(product)} >Add To Cart</Button>
            </div>
        </div>
    )
}

export default Product
