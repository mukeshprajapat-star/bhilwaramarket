import React from 'react';
import appStore from '../../../images/appStore.png';
import playStore from '../../../images/playStore.png';
import './Footer.css'
const Footer=()=>{
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>
                    DOWNLOAD OUR APP
                </h4>
                <p>Download app for Android and IOS mobile phone </p>
                <img src={playStore} alt="playStore"/>
                <img src={appStore} alt="appStore"/>
            </div>
            <div className="midFooter">
                <h1>ECommerce</h1>
                <p>High quality is our priority</p>
                <p>CopyRights 2021 &copy; MeMukeshPrajapat</p>
            </div>
            <div className="rightFooter">
                <h4>Follows Us</h4>
                <a href="https://www.instagram.com/mukeshprajapat09/">Instagram</a>
                <a href="https://www.facebook.com/mukesh.mukeshprajapat.1848">Facebook</a>
                <a href="http://linkedin.com/mukeshprajapat09">YouTube</a>
                            </div>
        </footer>
    )

}
export default Footer;