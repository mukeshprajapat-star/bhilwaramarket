import React ,{Fragment,useEffect}from 'react'
import {DataGrid} from "@material-ui/data-grid"
import {useDispatch,useSelector} from 'react-redux'
import MetaData from "../layout/MetaData"
import {Link} from 'react-router-dom' 
import {useAlert} from 'react-alert'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import {Button} from '@material-ui/core'
import Sidebar from './Sidebar'
import './productList.css'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'
import {clearErrors,getAllOrders,deleteOrder} from '../../actions/orderAction'

const OrderList = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
     const{error,orders}=useSelector((state)=>state.allOrders);
     const{error:deleteError,isDeleted}=useSelector((state)=>state.order);


     const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id))

     }
     useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
           }
           if(deleteError){
               alert.error(deleteError)
               dispatch(clearErrors())
           }
           if(isDeleted){
               alert.success("Order Deleted Successfully");
                history.push("/admin/orders");
               dispatch({type:DELETE_ORDER_RESET})
           }
           dispatch(getAllOrders())

    },[dispatch,history,error,alert, deleteError,isDeleted]);

     const columns=[
        {field:"id" ,headerName:"Order ID" ,minWidth:100,flex:1,},
        {
            field:"status",
            headerName:"Status",
            minWidth:80,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered"
                ? "greenColor":"redColor"
            }
        },
        {
            field:"itemsQty",
            headerName:"items Qty",
            type:"number",
            minWidth:100,
            flex:0.3,
        },
        {
            field:"amount",
            headerName:"Amount" ,
            type:"number",
            minWidth:100,
            flex:0.5,
        },
            {
                field:"action" ,
                headerName:"Actions" ,
                minWidth:100,
                flex:0.3,
                sortable:false,
                type:"number",
                renderCell:(params)=>{
                    return(
                        <Fragment>
                            <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                                <EditIcon/>
                            </Link>
                            <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                                <DeleteIcon/>
                            </Button>
                        </Fragment>
                    )
                }
            }

     ]
     const rows=[];

     orders && 
     orders.forEach((item)=>{
         rows.push({
             id:item._id,
             itemsQty:item.orderItem.length,
             amount:item.totalPrice,
             status:item.orderStatus
         })
     })

    
    return (
        <Fragment>
            <MetaData title=" All Orders Admin"/>
            <div className='dashboard'>
                <Sidebar/>
                <div className='productListContainer'>
                <h1 id='productListHeading'> All Orders</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
                >
                </DataGrid>
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList
