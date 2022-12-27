import React from 'react'
import './CartItemCard.css'
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';

const CartItemCard = ({item,deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={ item.images} alt="shhh"/>
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price:₹${item.price}`}</span>
                <Button className="p-button-sm" onClick={()=>deleteCartItems(item.product)}>Remove</Button>

            </div>
            
        </div>
    )
}

export default CartItemCard
