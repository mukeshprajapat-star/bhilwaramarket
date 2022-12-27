import React ,{useState}from 'react';
import { Menubar } from 'primereact/menubar';
//import logo from '../../../images/ecommerce.png'
import logo from "./logoE.jpg"
import "./Header.css"
import {InputText} from "primereact/inputtext"
import {Button} from 'primereact/button'
import { useHistory } from 'react-router-dom';
const Header = () => {
    const history=useHistory();
    const[keyword,setKeyword]=useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }
        else{
            history.push('/products')
        }

    }

    const items = [
        {
            label: 'Home',
            url:"/"
                },
                {
                    label: 'Products',
                    url:"/products"
                },
                {
                    separator: true
                },
                {
                    label: 'Contact',
                    url:"/contact"
                },
        {
            label: 'About',
            url:"/about"
        },
        {
            label: 'Profile',
            url:'/account',
           
        },
        {
            label: 'Cart',
            url:'/cart',

        },
        {
            separator: true
        },
        {
            icon:"pi pi-search",
            url:'/search',

        },
    ];

    const start = <img alt="logo" src={logo}  height="70px"  className="p-mr-2"></img>;
    const end= <div><form  onSubmit={searchSubmitHandler}><InputText  onChange={(e)=>setKeyword(e.target.value)}  placeholder="Search" type="text"/><Button  style={{ marginLeft: "20px", marginRight: "180px"}}>Search</Button></form></div>

    
    return (
        <div>
            <div className="card">
                <Menubar style={{height:"70px"}} model={items} start={start} className='CardItem' end={end}/>
            </div>
        </div>
    );
}

export default Header;
/*import React from 'react'
import {ReactNavbar} from 'overlay-navbar';
import logo from '../../../images/ecommerce.png'
const options={
    burgerColorHover:"#a62d24",
    logo,
     logoWidth:"7vmax",
     logoHoverSize:"10px",
     logoHoverColor:"#eb4034",
     navColor1:"white",
      link1Text:"Home",
       link2Text :"Products",
       link3Text:"Contact",
            link4Text :"About",
            link1Url :"/",
            link2Url:"/products",
             link3Url:"/contact",
              link4Url:"/about",
              linkSize:"1.3vmax",
              linkColor:"rgba(35,35,35,0.8)",
              nav1justifyContent:"flex-end",
              nav2justifyContent:"flex-end",
              nav3justifyContent:"flex-start",
              nav4justifyContent:"flex-start",
              link1ColorHover:"#eb4034",
              link1Margin:"1vmax",
              profileIconUrl:"/login",
              profileIconColor:"rgba(35,35,35,0.8)",
              searchIconColor:"rgba(35,35,35,0.8)",
              cartIconColor:"rgba(35,35,35,0.8)",
              searchIconColorHover:"#eb4034",
              cartIconColorHover:"#eb4034",
              profileIconColorHover:"#eb4034",
              cartIconMargin:"1vmax",

}
const Header=()=> {
    return (
        <div>
            <ReactNavbar {...options} />
        </div>
    )
}

export default Header;*/
