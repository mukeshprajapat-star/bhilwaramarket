import React,{Fragment,useEffect,useState} from 'react'
import './newProduct.css'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,getUserDetails,updateUser} from '../../actions/userAction'
import MetaData from '../layout/MetaData'
import { Button } from 'primereact/button';
import {useAlert} from 'react-alert'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PersonIcon from '@material-ui/icons/Person'
import { UPDATE_USER_RESET } from '../../constants/userConstant'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader/Loader'
import { InputText } from 'primereact/inputtext'

const UpdateUser = ({history,match}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {user,loading,error} =useSelector((state)=>state.userDetails);
    const {loading:updateLoading,error:updatedError,isUpdated} =useSelector((state)=>state.profile);

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[role,setRole]=useState("")

    const userId=match.params.id;

    useEffect(()=>{
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(updatedError){
            alert.error(updatedError);
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("User upadated Successfully")
            history.push("/admin/users")
            dispatch({type:UPDATE_USER_RESET});
        }
    },[dispatch,alert,error,history,isUpdated,updatedError,userId,user])
   
    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData();

        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("role",role)

        dispatch(updateUser(userId,myForm));
    }
    return (
      <Fragment>
          <MetaData title="Update User"/>
          <div className='dashboard'>
              <Sidebar/>
              <div className='newProductContainer'>
                {loading ?(<Loader/>)
                :(
                    <form className='createProductForm'
                    encType='multipart/form-data'    
                    onSubmit={updateUserSubmitHandler}>
  
                        <h1>Update User</h1>
                        <div>
                            <PersonIcon/>
                            <InputText
                             type="text" 
                             placeholder='Name' 
                             required 
                             value={name}
                              onChange={(e)=>setName(e.target.value)}
                              />
                        </div>
                        <div>
                            <MailOutlineIcon/>
                            <InputText
                             type="email" 
                             placeholder='email' 
                             required 
                              onChange={(e)=>setEmail(e.target.value)}
                              />
                        </div>
                        <div>
                            <VerifiedUserIcon/>
                            <select
                            value={role}
                              onChange={(e)=>setRole(e.target.value)}
                              >
                                  <option value="">Choose Role</option>
                                  <option value="admin">Admin</option>
                                  <option value="user">User</option>
                                  
                              </select>
                        </div>
                       
                        <Button type="submit" 
                        id="createProductBtn" 
                        disabled={updateLoading ? true:false||role===""? true :false}
                        >
                            Update
                        </Button>
                    </form>
                )} 
              </div>
          </div>
      </Fragment>
    );
}
export default UpdateUser;