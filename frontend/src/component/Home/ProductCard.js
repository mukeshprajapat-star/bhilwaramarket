import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from '@material-ui/lab'
import Paper from '@material-ui/core/Paper';

const ProductCard = ({product}) => {
    const options={
        value:product.ratings,
       readOnly:true,
       precision:0.5
    }
    return (
        <Paper  variant="outlined" style={{margin:"5px",height:"400px" }}>
       <Link className="productCard" to={`/product/${product._id}`}>
           <img src={product.images[0].url} alt ={product.name}/>
           <p>{product.name}</p>
           <div>
               <Rating {...options}/><span className='ProductCardSpan'>({product.numOfReviews} Reviews)</span>
           </div>
           <span>{`₹${product.price}`}</span>
       </Link>
       </Paper>
    )
}

export default ProductCard
