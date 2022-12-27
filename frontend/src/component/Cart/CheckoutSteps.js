import React ,{Fragment}from 'react'
import './CheckoutSteps.css'
import{Typography,Stepper,Step,StepLabel} from '@material-ui/core'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'

const CheckoutSteps = ({activeStep}) => {
    const steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },

    ]
    const stepStyles={
        boxSizing:'border-box'
    }
    return (
      <Fragment>
          <Stepper  alternativeLabel activeStep={activeStep} style={stepStyles}>
              {steps.map((item,index)=>{
                  return (<Step 
                   key={index}
                    active={activeStep===index ? true:false} 
                    completed={activeStep >= index ? true:false}
                    >
                      <StepLabel
                       icon={item.icon} 
                       style={{
                           color:activeStep >= index ? "rgb(255, 57, 57)":"rgba(0,0,0,649)"}} 
                       >
                           {item.label}
                           </StepLabel>
                  </Step>)
              })}
          </Stepper>
      </Fragment>
    )
}

export default CheckoutSteps
