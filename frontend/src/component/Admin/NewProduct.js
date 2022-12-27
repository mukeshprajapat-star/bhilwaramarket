import React,{Fragment,useEffect,useState} from 'react'
import './newProduct.css'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,createProduct} from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { Button } from 'primereact/button';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { NEW_PRODUCT_RESET } from '../../constants/productConstant'
import Sidebar from './Sidebar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import { useAlert } from 'react-alert'



const NewProduct = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {loading,error,success } =useSelector((state)=>state.newProduct);

    const[name,setName]=useState("")
    const[price,setPrice]=useState(0)
    const[stock,setStock]=useState(0)
    const[description,setDescription]=useState("")
    const[category,setCategory]=useState("")
    const[images,setImages]=useState([])
    const[imagesPreview,setImagesPreview]=useState([])

    const categories=[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attrire",
        "Camera",
        "SmartPhones"
    ]
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Product Created Successfully")
            history.push("/admin/dashboard")
            dispatch({type:NEW_PRODUCT_RESET});
        }
    },[dispatch,alert,error,history,success])
   
    const createProductSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData();

        myForm.set("name",name)
        myForm.set("price",price)
        myForm.set("category",category)
        myForm.set("description",description)
        myForm.set("stock",stock)

        images.forEach((image)=>{
            myForm.append("images",image);
        })
        dispatch(createProduct(myForm));
    }

    const createProductImagesChange=(e)=>{
        const files=Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file)=>{
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    return (
      <Fragment>
          <MetaData title="Create Product"/>
          <div className='dashboard'>
              <Sidebar/>
              <div className='newProductContainer'>
                  <form className='createProductForm'
                  encType='multipart/form-data'    
                  onSubmit={createProductSubmitHandler}>

                      <h1>Create Product</h1>
                      <div>
                          <SpellcheckIcon/>
                          <InputText
                           type="text" 
                           placeholder='Product Name' 
                           required 
                           value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                      </div>
                      <div>
                          <AttachMoneyIcon/>
                          <InputText
                           type="number" 
                           placeholder='Price' 
                           required 
                            onChange={(e)=>setPrice(e.target.value)}
                            />
                      </div>
                      <div>
                          <DescriptionIcon/>
                          <InputTextarea 
                          type="text"
                           placeholder='Description'
                            value={description}
                             onChange={(e)=>setDescription(e.target.value)}
                              rows={1}
                               cols={10}
                                autoResize />
                      </div>

                      <div>
                          <AccountTreeIcon/>
                          <select
                            onChange={(e)=>setCategory(e.target.value)}
                            >
                                <option value="">Choose categories</option>
                                {categories.map((cate)=>(
                                     <option key={cate} value={cate}> {cate}</option>
                                ))}
                            </select>
                      </div>

                      <div>
                          <StorageIcon/>
                          <InputText
                           type="number" 
                           placeholder='Stock' 
                           required 
                            onChange={(e)=>setStock(e.target.value)}
                            />
                      </div>
                      <div id='createProductFormFile'>
                          <InputText
                          type="file"
                          name="avatar"
                          accept='image/*'
                          onChange={createProductImagesChange}
                          multiple
                          />
                      </div>
                      <div id='createProductFormImage'>
                          {imagesPreview.map((image,index)=>(
                              <img key={index} src={image} alt="Product Preview"/>
                              ))}
                      </div>
                     
                      <Button type="submit" 
                      id="createProductBtn" 
                      disabled={loading ? true:false}
                      >
                          Create
                      </Button>
                  </form>
              </div>
          </div>
      </Fragment>
    );
}
export default NewProduct;