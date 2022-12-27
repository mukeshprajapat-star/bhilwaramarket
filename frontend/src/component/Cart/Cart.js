import React ,{Fragment}from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.js'
import {useDispatch ,useSelector} from 'react-redux'
import { addItemsToCart,removeItemFromCart } from '../../actions/cartAction'
import { Typography } from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const Cart=({item,history})=>{
    const dispatch=useDispatch();

    const {cartItems}= useSelector((state) =>state.cart);

    const increaseQuantity=(id,quantity,stock)=>{
        const newQty=quantity+1; 

        if(stock<=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }

    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(1>=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }
    const deleteCartItems=(id)=>{
        dispatch(removeItemFromCart(id));
    }
    const checkOutHandler=()=>{
        history.push("/login?redirect=shipping")
    }
    return(
       <Fragment>
           {cartItems.length===0 ? (
               <div className='emptyCart'>
                   <RemoveShoppingCartIcon/>
                   <Typography>No Products in Your Cart</Typography>
                   <Link to="/products"><Button style={{width:"200px" ,paddingLeft:"44px"}}>Views Products</Button></Link>
               </div>
           ) : (
                <Fragment>
                <div className='cartPage'>
                    <div className='cartHeader'>
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>SubTotal</p>
                    </div>
                    
                   {cartItems && cartItems.map((item)=>(
                        <div className='cartContainer' key={item.product}>
                       <Card style={{ width: '15rem',height:"15rem", marginBottom: '2em' }} >
                        <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                        </Card>
                        <div className='cartInput'>
                            <Button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</Button>
                            <input type="number" value={item.quantity} readOnly/>
                            <Button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</Button>
                        </div>
                        <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
                    </div>
                     
                   ))}
                 
                    <div className='cartGrossProfit'>
                   <div></div>
                        <div className='cartGrossProfitBox'>
                            <p>Gross Total</p>
                            <p>{`₹ ${cartItems.reduce(
                                (acc,item)=>acc + item.quantity * item.price,0
                            )}`}</p>
                        </div>
                        <div></div>
                        <div className='checkOutBtn'>
                            <Button onClick={checkOutHandler}>Check Out</Button>
    
                        </div>
                    </div>
                </div>
            </Fragment>

           )}
       </Fragment>
    )
}

export default Cart
