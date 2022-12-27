import React,{Fragment,useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,getProductDetails,updateProduct} from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { Button } from 'primereact/button';
import {useAlert} from 'react-alert'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import Sidebar from './Sidebar'
import { InputText } from 'primereact/inputtext';
import  {InputTextarea} from 'primereact/inputtextarea';


const UpdateProduct = ({history,match}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {product,error} =useSelector((state)=>state.productDetails);
    const {loading,error:updateError,isUpdated } =useSelector((state)=>state.product);
    const[name,setName]=useState("")
    const[price,setPrice]=useState(0)
    const[stock,setStock]=useState(0)
    const[description,setDescription]=useState("")
    const[images,setImages]=useState([])
    const[oldImages,setOldImages]=useState([])
    const[category,setCategory]=useState("")
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
    const productId=match.params.id

    useEffect(()=>{
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }
        else{
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
            setCategory(product.category);
            setOldImages(product.images);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Product update Successfully")
            history.push("/admin/products")
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    },[dispatch,alert,error,history,isUpdated,productId,product,updateError])
   
    const updateProductSubmitHandler=(e)=>{
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
        dispatch(updateProduct(productId,myForm));
    }

    const updateProductImagesChange=(e)=>{
        const files=Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file)=>{
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old)=>[...old,reader.result])
                    setImages((old)=>[...old,reader.result])
                }
            }
            reader.readAsDataURL(file)
        });
    };
    return (
      <Fragment>
          <MetaData title="Update Product"/>
          <div className='dashboard'>
              <Sidebar/>
              <div className='newProductContainer'>
                  <form className='createProductForm'
                  encType='multipart/form-data'    
                  onSubmit={updateProductSubmitHandler}>

                      <h1>Update  Product</h1>
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
                           value={price}
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
                            cols={30}
                            rows={1}
                            autoResize
                            />
                      </div>

                      <div>
                          <AccountTreeIcon/>
                          <select value={category}
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
                           value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                            />
                      </div>
                      <div id='createProductFormFile'>
                          <InputText
                          type="file"
                          accept='image/*'
                          name="avatar"
                          onChange={updateProductImagesChange}
                          multiple
                          />
                      </div>

                      <div id='createProductFormImage'>
                          {oldImages && oldImages.map((image,index)=>(
                              <img key={index} src={image.url} alt="Old Product Preview"/>
                          ))}
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
export default UpdateProduct