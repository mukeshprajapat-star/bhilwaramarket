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
import { getAllUsers ,clearErrors, deleteUser} from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstant'

const UsersList = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
     const{error,users}=useSelector((state)=>state.allUsers);
     const{error:deleteError,message,isDeleted}=useSelector((state)=>state.profile);


     const deleteUserHandler=(id)=>{
         dispatch(deleteUser(id))

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
               alert.success(message);
              history.push("/admin/users");
               dispatch({type:DELETE_USER_RESET})
           }
           dispatch(getAllUsers())

    },[dispatch,history,error,alert,deleteError,isDeleted,message]);

     const columns=[
         {field:"id" ,headerName:"User ID",minWidth:150,flex:0.5},
         {
             field:"email",
             headerName:"Email" ,
             minWidth:300,
             flex:1
            },
         {
             field:"name"
             ,headerName:"Name",
             minWidth:100,
             flex:0.3
            },

         {
             field:"role",
             headerName:"Role",
             minWidth:100,
             type:"number",
             flex:0.5,
             cellClassName:(params)=>{
                return params.getValue(params.id,"role")==="admin"
                ? "greenColor":"redColor"
            }
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
                            <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                                <EditIcon/>
                            </Link>
                            <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                                <DeleteIcon/>
                            </Button>
                        </Fragment>
                    )
                }
            }

     ]
     const rows=[];

     users && 
     users.forEach((item)=>{
         rows.push({
             id:item._id,
             email:item.email,
             role:item.role,
             name:item.name
         })
     })

    
    return (
        <Fragment>
            <MetaData title=" All Users Admin"/>
            <div className='dashboard'>
                <Sidebar/>
                <div className='productListContainer'>
                <h1 id='productListHeading'> All Users</h1>
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

export default UsersList

