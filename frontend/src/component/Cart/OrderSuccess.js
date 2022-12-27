import React, { Fragment } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {Link } from 'react-router-dom'
import {Typography} from '@material-ui/core'
import "./orderSuccess.css"

const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="orderSuccess">
                <CheckCircleIcon/>
                <Typography>Your Order has been placed successFully</Typography>
                <Link to="/orders">View Orders</Link>
            </div>
        </Fragment>
    );
};

export default OrderSuccess
