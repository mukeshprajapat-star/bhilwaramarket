import React,{Fragment,useState} from 'react'
import './Shipping.css'
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import PinDropIcon  from  '@material-ui/icons/PinDrop'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PublicIcon from '@material-ui/icons/Public'
import PhoneIcon from '@material-ui/icons/Phone'
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation"
import {Country ,State} from 'country-state-city'
import CheckoutSteps from '../Cart/CheckoutSteps'
import {useAlert} from 'react-alert' 
import { Button } from 'primereact/button';
import { InputText} from 'primereact/inputtext';

const Shipping = ({history}) => {
    const dispatch = useDispatch();
    
    const {shippingInfo}=useSelector((state)=>state.cart);
    const alert =useAlert();
    const[address,setAddress]=useState(shippingInfo.address)
    const[city,setCity]=useState(shippingInfo.city)
    const[state,setState]=useState(shippingInfo.state)
    const[country,setCountry]=useState(shippingInfo.country)
    const[pinCode,setPinCode]=useState(shippingInfo.pinCode)
    const[phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo)

    const shippingSubmit=(e)=>{
      e.preventDefault();
      if(phoneNo.length < 10 || phoneNo.length >10 ){
        alert.error("Phone Number should be 10 digit Long");
        return;
      }
      dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
      history.push('/order/confirm')
    };
    return (
      <Fragment>
        <MetaData title="Shipping Details"/>
        <CheckoutSteps activeStep={0}/>
           <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form 
          className='shippingForm'
          encType="multipart/form-data"
          onSubmit={shippingSubmit}>
              <div>
                  <HomeIcon/>
                  <InputText
                   type="text"
                    placeholder='Address'
                    required 
                    value={address} 
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                  </div> 
                  <div>
                  <LocationCityIcon/>
                  <InputText
                   type="text"
                    placeholder='city'
                    required 
                    value={city} 
                    onChange={(e)=>setCity(e.target.value)}
                    />
                  </div>
                  <div>
                  <PinDropIcon/>
                  <InputText
                   type="number"
                    placeholder='pinCode'
                    required 
                    value={pinCode} 
                    onChange={(e)=>setPinCode(e.target.value)}
                    />
                  </div>
                  <div>
                  <PhoneIcon/>
                  <InputText
                   type="number"
                    placeholder='phoneNo'
                    required 
                    value={phoneNo} 
                    onChange={(e)=>setPhoneNo(e.target.value)}
                    size="10"
                    />
                  </div>
                  <div>
                      <PublicIcon/>
                      <select 
                      required
                       value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        >
                            <option value=""> Country</option>
                            {Country && Country.getAllCountries().map((item)=>(
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>

                            ))}

                      </select>
                  </div>
                  {country && (
                      <div>
                          <TransferWithinAStationIcon/>
                          <select
                           required
                            value={state}
                             onChange={(e)=>setState(e.target.value)}
                             >
                                 <option value="">State</option>
                                 {State && 
                                 State.getStatesOfCountry(country).map((item)=>(
                                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                 ))}
                          </select>
                      </div>
                  )}
                  <Button
                   type="submit" 
                   label="Continue" 
                   className='shippingBtn' 
                   disabled={state ? false:true}/>
          </form>
          </div>
          </div>
      </Fragment>
    )
}

export default Shipping
