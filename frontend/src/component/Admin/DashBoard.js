import React,{Fragment,useEffect} from 'react'
import Sidebar from "./Sidebar.js"
import './dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2'
import {useSelector,useDispatch} from 'react-redux'
import {getAdminProduct} from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'

const DashBoard = () => {
    const dispatch=useDispatch();
    
    const {products}=useSelector((state)=>state.products);
    const {orders}=useSelector((state)=>state.allOrders);
    const {users}=useSelector((state)=>state.allUsers);

    let outOfStock = 0;
     
    products &&
    products.forEach((item)=>{
        if(item.stock === 0){
            outOfStock +=1;
        }
    })

    let totalAmount=0;
    orders
     && orders.forEach(item=>{
        totalAmount +=item.totalPrice
    })
    useEffect(()=>{
        dispatch(getAdminProduct())
        dispatch(getAllOrders())
        dispatch(getAllUsers())
    },[dispatch])

    const lineState={
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,totalAmount]
            },
        ],
    }
    const doughnutState={
        labels:["OutOfStock" ,"InStock"],
        datasets:[
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data:[outOfStock,products.length - outOfStock]
            }
        ],
    }
    return (
        <Fragment>
        <div className='dashboard'>
            <Sidebar/>
            <div className='dashboardContainer'>
                <Typography component="h1">DashBoard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Tatol Amount <br/> ₹{totalAmount}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <p>products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className='lineChart'>
                    <Line data={lineState}/>
                </div>
                <div className='doughnutChart'>
                    <Doughnut data={doughnutState}/>
                </div>
            </div>
            
        </div>
        </Fragment>
    )
}

export default DashBoard
