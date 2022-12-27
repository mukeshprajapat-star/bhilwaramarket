import React ,{Fragment,useState,useEffect}from 'react'
import {DataGrid} from "@material-ui/data-grid"
import {useDispatch,useSelector} from 'react-redux'
import MetaData from "../layout/MetaData"
import {useAlert} from 'react-alert'
import DeleteIcon from "@material-ui/icons/Delete"
import Star from "@material-ui/icons/Star"
import { Button } from 'primereact/button';
import {clearErrors,getAllReviews,deleteReviews} from '../../actions/productAction'
import Sidebar from './Sidebar'
import './productReview.css'
import { DELETE_REVIEW_RESET } from '../../constants/productConstant'
import { InputText } from 'primereact/inputtext'

const ProductReviews = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
     const{error,reviews,loading}=useSelector((state)=>state.productReviews);
     const{error:deleteError,isDeleted}=useSelector((state)=>state.review);

     const deleteReviewHandler=(reviewId)=>{
         dispatch(deleteReviews(reviewId,productId))

     }
     const [productId,setProductId]=useState("");
     const productReviewsSubmitHandler=(e)=>{
         e.preventDefault();
         dispatch(getAllReviews(productId))
     };
     useEffect(()=>{
         if(productId.length===24){
             dispatch(getAllReviews(productId))
         }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
           }
           if(deleteError){
               alert.error(deleteError)
               dispatch(clearErrors())
           }
           if(isDeleted){
               alert.success("Review Delete Successfully");
               history.push("/admin/reviews");
               dispatch({type:DELETE_REVIEW_RESET})
           }
           dispatch(getAllReviews())

    },[dispatch,error,alert,history,deleteError,isDeleted,productId]);

     const columns=[
         {field:"id" ,headerName:"Review ID",minWidth:150,flex:0.5},
         {
             field:"user",
             headerName:"User" ,
             minWidth:200,
             flex:0.6
            },
         {
             field:"comment"
             ,headerName:"Comment",
             minWidth:100,
             flex:1
            },

         {
             field:"rating",
             headerName:"rating",
             minWidth:100,
             flex:0.4,
             cellClassName:(params)=>{
                return params.getValue(params.id,"rating") >= 3
                ? "greenColor":"redColor"
            }
            },
         
            {
                field:"action" ,
                headerName:"Actions" ,
                minWidth:80,
                flex:0.3,
                sortable:false,
                type:"number",
                renderCell:(params)=>{
                    return(
                        <Fragment>
                            <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}>
                                <DeleteIcon/>
                            </Button>
                        </Fragment>
                    )
                }
            }

     ]
     const rows=[];

     reviews && 
     reviews.forEach((item)=>{
         rows.push({
             id:item._id,
             comment:item.comment,
             rating:item.rating,
             user:item.name
         })
     })
    return (
        <Fragment>
            <MetaData title=" All Reviews Admin"/>
            <div className='dashboard'>
                <Sidebar/>
                <div className='productReviewsContainer'>
                    <form className='productReviewsForm'
                    encType='multipart/form-data'    
                    onSubmit={productReviewsSubmitHandler}
                    >
                         <h1 className='productReviewsFormHeading'>All Reviews</h1>
                        <div>
                            <Star/>
                            <InputText
                             type="text" 
                             placeholder='productId' 
                             required 
                             value={productId}
                              onChange={(e)=>setProductId(e.target.value)}
                              />
                        </div>
                       
                        <Button type="submit" 
                        id="createProductBtn" 
                        disabled={loading ? true:false||productId===""? true :false}
                        >
                            Search
                        </Button>
                    </form>
              
               {reviews && reviews.length > 0 ? (
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                    >
                    </DataGrid>
               ):(
                   <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
               )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews
