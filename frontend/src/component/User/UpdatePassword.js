import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { clearErrors,updatePassword} from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from '../layout/MetaData'
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { InputText} from "primereact/inputtext";
import { Button } from "primereact/button";

const UpdatePassword = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error,isUpdated,loading } = useSelector((state) => state.profile);

    const[oldPassword,setOldPassword]=useState("");
    const[newPassword,setNewPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
      };
      useEffect(()=>{
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Password Updated Successfullly");
          history.push("/account");
          dispatch({
              type:UPDATE_PASSWORD_RESET
          })
        }
      },[dispatch,alert,error,history,isUpdated]);

    return (
        <Fragment>
        {loading ?<Loader/>:(
            <Fragment>
            <MetaData title="Update Password"/>
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
          <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                  <div className="loginPassword">
                  <VpnKeyIcon />
                  <InputText
                    type="password"
                    placeholder="Old Password"
                    required
                    name="password"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <InputText
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <InputText
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button  style={{paddingLeft:" 8vmax"}} type="submit" className="updatePasswordBtn">Change</Button>
              </form>
              </div>
              </div>
              </Fragment>
              )}    
        </Fragment>
    )
}


export default UpdatePassword
