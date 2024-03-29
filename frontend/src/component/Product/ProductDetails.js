import React ,{Fragment,useEffect,useState}from 'react'
import './ProductDetails.css'
import { Button } from 'primereact/button';
import Carousel from 'react-material-ui-carousel'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,getProductDetails,newReview} from '../../actions/productAction' 
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData'
import {addItemsToCart} from '../../actions/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const ProductDetails = ({match}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {product,error,loading}=useSelector((state)=>state.productDetails) ;
    const {success,error:reviewError}=useSelector((state)=>state.newReview);

    const options={
        size:"large",
        value:product.ratings,
        readOnly:true,
        precision:0.5
    }

    const [quantity,setQuantity]=useState(1);
    const [rating,setRating]=useState(0)
    const [open,setOpen]=useState(false)
    const [comment,setComment]=useState("")

    const submitReviewToggle=()=>{
        open ? setOpen(false):setOpen(true)
    }
    const reviewSubmitHandler=()=>{
        const myForm=new FormData()
        myForm.set("rating",rating)
        myForm.set("comment",comment)
        myForm.set("productId",match.params.id)

        dispatch(newReview(myForm));

        setOpen(false)
    }
    const increaseQuantity=()=>{
        if(product.stock <=quantity) return;
        const qty=quantity+1;
        setQuantity(qty);
    }
       const decreaseQuantity=()=>{
        if(1>=quantity) return;
        const qty=quantity-1;
        setQuantity(qty);
       }
       const addToCartHandler=()=>{
           dispatch(addItemsToCart(match.params.id,quantity));
           alert.success("Item Added To Cart");
       }
 
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted Successfully")
            dispatch({type:NEW_REVIEW_RESET})
        }

      dispatch(getProductDetails(match.params.id));
    }, [dispatch,match.params.id,error,alert,reviewError,success]);
    return (
      <Fragment>
          {loading ? (<Loader/>) : (
                <Fragment>
                     <MetaData title={`${product.name} --ECOMMERCE`}/>
                <div className='ProductDetails' >
                    <div>
                        <Carousel>
                            {product.images
                             && product.images.map((item,i)=>(
                                <img
                                className="CarouselImage"
                                src={item.url}
                                key={i}
                                alt={`${i} Slide`}
                                />
                                 ))}
                        </Carousel>
        
                    </div>
                    <div>
                        <div className='detailsBlock-1'>
                            <h2>{product.name}</h2>
                            <p>Product #{product._id}</p>
                        </div>
                        <div className='detailsBlock-2'>
                            <Rating {...options}/>
                            <span>{product.numOfReviews} Reviews</span>
                        </div>
                        <div className='detailsBlock-3'>
                            <h1>{`₹${product.price}`}</h1>
                            <div className='detailsBlock-3-1'>
                                <div className='detailsBlock-3-1-1'>
                                    <Button className="p-button-info" onClick={decreaseQuantity}>-</Button>
                                    <input  readOnly type="number" value={quantity}/>
                                    <Button  className="p-button-info" onClick={increaseQuantity}>+</Button>
                                </div>
                                <Button  className="p-button-rounded p-button-secondary" label="Add to Cart" disabled={product.stock < 1 ? true :false} onClick={addToCartHandler}/>
                            </div>
                            <p>
                                Status:<b className={product.stock < 1 ? "redColor":"greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className='detailsBlock-4'>
                            Descriptions:<p>{product.description}</p>
        
                        </div>
                        <button onClick={submitReviewToggle}  className='submitReview'>Submit Reviews</button>
                    </div>
                </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog aria-labelledby='simple-dialog-title'
                open={open}
                onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Reviews</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating onChange={(e)=>setRating(e.target.value)}
                        size="large"
                        value={rating}
                        />
                        <textarea 
                        cols="30"
                         rows="5"
                          className='submitDialogtextarea'
                          value={comment}
                          onChange={(e)=>setComment(e.target.value)}
                          />                        

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle}color="secondary" >Cencel</Button>
                        <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
                    </DialogActions>

                </Dialog>
                {product.reviews && product.reviews[0] ?
                (<div className='reviews'>
                    {product.reviews && product.reviews.map((review)=>
                        <ReviewCard review={review}/>
                    )}
                </div>)
                :(
                    <p className='noReviews'>
                        No Reviews Yet
                    </p>
                ) }
                </Fragment>
          )}
      </Fragment>
    )
}

export default ProductDetails
