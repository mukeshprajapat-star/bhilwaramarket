import React ,{useEffect,Fragment,useState}from 'react'
import './Products.css'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader.js'
import ProductCard from '../Home/ProductCard'
import {clearErrors,getProduct} from '../../actions/productAction'
import {useAlert} from 'react-alert'
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import MetaData from '../layout/MetaData'

const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attrire",
    "Camera",
    "SmartPhones"
]
 
const Products = ({match}) => {

    const dispatch=useDispatch();

    const alert=useAlert();

   const[currentPage,setCurrentPage]=useState(1);
   const[price,setPrice]=useState([0,25000]);
   const[category,setCategory]=useState("");
   const[ratings,setRatings]=useState(0);
   
   const {
       products,
       productsCount,
       resultPerPage,
       error,
       loading,
       //filteredProductsCount,
    }
    =useSelector((state)=>state.products);

        const keyword=match.params.keyword;

        const setCurrentPageNo=(e)=>{
            setCurrentPage(e);
        }
        const priceHandler=(event,newPrice)=>{
            setPrice(newPrice);
        }
        //let count = filteredProductsCount;

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error,]);

    
    return (
        <Fragment>
            {loading ? (<Loader/>):(
                <Fragment>
                    <MetaData title="PRODUCTS ...ECOMMERCE"/>
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                      
                        {products && 
                        products.map((product)=>(
                            <ProductCard key={product._id} product={product}/>
                        ))}
                         </div>
                         <div className='filterBox'>
                             <Typography>Price</Typography>
                             <Slider
                             value={price}
                             onChange={priceHandler}
                             valueLabelDisplay="auto"
                             aria-labelledby='range-label'
                             min={0}
                             max={25000}
                             />

                         </div>
                         <div className='typocategory'>
                         <Typography >Categories</Typography>
                         <ul className="categoryBox">
                         {categories.map((category)=>(
                                 <li className="category-link" onClick={()=>setCategory(category)}>
                                     {category}
                                 </li>                             

                         ))}
                         </ul>
                         </div>
                         <fieldset className='ratings'>
                             <Typography component="legend">Ratings Above</Typography>
                             <Slider
                             value={ratings}
                             onChange={(event,newRating)=>setRatings(newRating)
                             }
                             aria-labelledby="continuous-slider"
                             min={0}
                             max={5}
                             valueLabelDisplay='auto'
                             />
                         </fieldset>
       
                        {resultPerPage < productsCount && (
                            <div className='paginationBox'>
                            <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                            />
                            </div>
                         
                        
                            )};
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products;


