import React, { useState , useEffect , useContext} from "react";
// import axios from "axios";

import ProductView from './ProductView';

// import SideCart from './cart/SideCart';
// import Burger2 from '../layouts/images/burger2.png';
// import Nophoto from '../layouts/images/no-photo.jpg';
// import PofshopBanner from '../layouts/images/banners.jpg';

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

import { motion } from "framer-motion"

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';

import { SideContext } from '../context/SideContext';
import { ProductContext } from '../context/ProductContext';



// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';

// import { Carousel } from 'antd';

// const contentStyle = {
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
// };



const DashboardIndex = ({getAllCart , getAllNextOrder}) => {
    // const sliderBanner = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000
    // };
    
    const [product,setProduct] = useState([]) 
    const [lowHigh,setLowHigh] = useState(true)
    const [loading,setLoading] = useState(true)
  
    const changeValue = (e) => {
        (e.currentTarget.value === 'highToLow' ? setLowHigh(true) : setLowHigh(false))
    }

    const {cart,wishlist,setting,productView}  = useContext(SideContext)
    const [sidebarWishList,setSidebarWishList] = wishlist
    const [sidebarCart,setSidebarCart] = cart
    const [settingToggle, setSettingToggle] = setting
    const [sidebarProductView,setSidebarProductView] = productView
    
    const {product_data,loading_prod_view,prod_quantity}  = useContext(ProductContext)
    const [loadingProductView,setLoadingProductView] = loading_prod_view
    const [productData,setProductData] = product_data
    const [quantity, setQuantity] = prod_quantity

    const [productCategory] = useState([
        {name:'Dadas Eats'},
        {name:'Dadas Market'},
        {name:'Dadas Litson'},
        {name:'Product Category'},
        {name:'Product Category2'},
        {name:'Product Category3'},
    ])

    const productClick = (e) => {
        let prod_id = e.currentTarget.getAttribute('id')
        
        if ((sidebarCart === true) || (sidebarWishList === true) ) {
            setSidebarCart(false)    
            setSidebarWishList(false)    
        }
        setSidebarProductView(true)
        setSettingToggle(false)

        setLoadingProductView(true)
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/product/get-id?id=${prod_id}`)
        .then(response => response.text())
        .then((response) => {
            let cart_quantity = 1;
            if (JSON.parse(response).cart_quantity.length > 0) {
                cart_quantity = JSON.parse(response).cart_quantity[0]['quantity']
            }
            setProductData(JSON.parse(response).product_data)
            setLoadingProductView(false)
            setQuantity({...quantity, prod_quantity:cart_quantity})
        })
        .catch((error) => {
            console.log('error',error)
        });
        
    }
    
    useEffect(() => {
        fetch('https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/product/read')
        .then(response => response.text())
        .then((response) => {
            setProduct(JSON.parse(response))
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        })
        .catch((error) => {
            console.log('error',error)
        });

        if ((sidebarCart === true) || (sidebarWishList === true)) {
            setSidebarProductView(false)
        }
    // },[sidebarCart,sidebarWishList,sidebarProductView,settingToggle])
    },[])


    return ( 
        <>
            
            <div className="dashboardContainer border-none p-0 m-0 ">
                <ProductView getAllCart={getAllCart} getAllNextOrder={getAllNextOrder}/>
                <div className="MainBanner d-md-flex">
                    <div className="border-10 headBanner" style={{
                            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161881059720210419133637.jpg")`,backgroundRepeat: 'no-repeat',width:'100%',backgroundSize:'cover',backgroundPosition:'center center'
                        }}>
                    </div>
                    <div className="border-10 advertiseBanner d-none d-md-block"  style={{
                            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161881059720210419133637.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                        }}>
                    </div>
                </div>
                <div className="sticky-top-category">
                    <div className="categoryContainer">
                        <div className="filterCategory border-10 shadow bg-white d-none d-md-block">
                            <div className="d-flex justify-content-around">
                                <div className="c-red mt-3 f-14"><strong>Sort</strong></div>
                                <div className="c-red mt-2 f-14">
                                <Checkbox size="small" name="checkedB" color="secondary"/>
                                <span className="mt-1">Reset All</span>
                                </div>
                            </div><hr className="m-3"/>
                            <div className="mt-2 f-14 ml-4">
                                <Checkbox size="small" name="checkedB" color="secondary"/>
                                <span className="mt-1">Seafoods</span>
                            </div>
                            <div className=" mt-2 f-14 ml-4">
                                <Checkbox size="small" name="checkedB" color="secondary"/>
                                <span className="mt-1">Produce</span>
                            </div>
                            <div className=" mt-2 f-14 ml-4">
                                <Checkbox size="small" name="checkedB" color="secondary"/>
                                <span className="mt-1">Drinks</span>
                            </div>
                            <div className=" mt-2 f-14 ml-4">
                                <Checkbox size="small" name="checkedB" color="secondary"/>
                                <span className="mt-1">Meat and Poultry</span>
                            </div>
                        </div>
                        <div className="brandContainer">
                            <div className="brandCategory ">
                                {productCategory.map((p,i)=>(
                                    <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="brandItem d-flex justify-content-center align-items-center bg-white border-10 shadow p-2 p-md-3"><strong> {p.name}</strong></motion.div>
                                ))}
                            </div>
                            <div className="col-12 mt-4 mb-4 text-center text-md-left">
                                <Button variant="contained" size="small" value="highToLow"  onClick={changeValue} className={`border-15 shadow ${lowHigh ? " c-c72c41 c-white" :'bg-white'}`}>
                                    <div className="f-10">Price High to Low</div>
                                </Button>
                                <Button variant="contained" size="small" value="lowToHigh" onClick={changeValue} className={`ml-3 border-15 shadow ${!lowHigh ? 'c-c72c41 c-white' :'bg-white'}`}>
                                    <div className="f-10">Price Low to High</div>
                                </Button>
                            </div>
                            <div className="MainBanner">
                                <div className="border-10 advertiseBanner d-md-none d-sm-block"  style={{
                                        backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161881059720210419133637.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                                    }}>
                                </div> 
                            </div>
                            <div className="mt-2 mb-2 col-12"><strong>Recommended Products</strong></div>
                            <div className="productContainer">
                                {product.sort((p,b) =>{
                                    if (lowHigh === true) {
                                        return p.price < b.price ? 1 : -1
                                    }else{
                                        return p.price > b.price ? 1 : -1
                                    }
                                })
                                .map((p,i)=>(
                                    <motion.div whileTap={{ scale: 0.9 }} className="productCard p-1 shadow bg-white" key={p.id} value="cartProduct" id={p.id} onClick={productClick}>
                                        <div className="PromoHeader">
                                            {loading ? <Skeleton variant="rect"  height={150} /> : <div className="border-10 cartImg"  style={{
                                                backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100%',height:'150px',backgroundSize:'cover',backgroundPosition:'center center'
                                            }}>
                                                <div className="productPrice border-15 f-10 p-1 text-center w-30 float-right"><strong>P{(p.unit_price - 0).toFixed(2)}</strong></div><br/>
                                                <div className="f-10 text-center w-30 float-right c-red"><del>P5000.00</del></div>
                                            </div>}
                                        </div>
                                        <div className="PromoBody text-center">
                                            <div><strong className="f-13">{loading ? <Skeleton variant="text"/>: p.name}</strong></div>
                                            <div>{loading ? <Skeleton variant="text"/>: <Rating name="read-only" value={4} size="small" readOnly />}</div>
                                            <div className="f-10 c-grey">{loading ? <Skeleton variant="text"/>: <><div>A small river named Duden flows</div><div>by their place and supplies</div></>}</div>
                                        </div>
                                        <div className="">&nbsp;</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="col-12 d-block d-md-none">&nbsp;</div>
                            <div className="col-12 d-block d-md-none">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
 
export default DashboardIndex;