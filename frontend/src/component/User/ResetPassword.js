import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { clearErrors,resetPassword} from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from '../layout/MetaData'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

const ResetPassword = ({history,match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error,success,loading } = useSelector((state) => state.forgotPassword);

    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();

        myForm.set("password",password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token,myForm));
      };
      useEffect(()=>{
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(success){
            alert.success("Password Updated Successfullly");
          history.push("/login");
          dispatch({
              type:UPDATE_PASSWORD_RESET
          })
        }
      },[dispatch,alert,error,history,success]);

    return (
        <Fragment>
        {loading ?<Loader/>:(
            <Fragment>
            <MetaData title="Reset Password"/>
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
          <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <InputText
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div>
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
                <Button type="submit"  style={{paddingLeft:" 5vmax"}} label="Update" className="resetPasswordBtn" >Update</Button>
              </form>
              </div>
              </div>
              </Fragment>
              )}    
        </Fragment>
    )
}

export default ResetPassword
