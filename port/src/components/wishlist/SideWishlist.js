import { Link  } from 'react-router-dom'
import { useState,useContext,useEffect } from 'react';
import axios from "axios";

import {makeStyles, Checkbox, Button} from '@material-ui/core';

import { SideContext } from '../context/SideContext';
import { ProductContext } from '../context/ProductContext';

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none"
    },
    textField: {
        width: 100
    },
}));

const SideWishlist = ({getAllCart , getAllNextOrder}) => {
    const classes = useStyles();
    const {wishlist,productView}  = useContext(SideContext)
    const [sidebarWishList,setSidebarWishList] = wishlist
    const [sidebarProductView,setSidebarProductView] = productView

    const {next_order,next_subtotal,next_check_all,loading_prod_view,product_data,prod_quantity} = useContext(ProductContext)
    const [nextOrder,setNextOrder] = next_order
    const [nextSubtotal,setNextSubtotal] = next_subtotal
   
    const [nextCheckAll,setNextCheckAll] = next_check_all
    const [showCart , setShowCart] = useState(true)

    const [productData,setProductData] = product_data
    const [loadingProductView,setLoadingProductView] = loading_prod_view
    const [quantity, setQuantity] = prod_quantity
    
    const onChangeHandle = (e) => {
        (e.currentTarget.getAttribute('value') === 'cart'? setShowCart(true) : setShowCart(false))
    }

    const handleClose = () =>{
        setSidebarWishList(false)
    }
  
    const handleCheckAll = () => {
        let active;
        if (nextCheckAll == true) {
            setNextCheckAll(false)
            active = '0'
        }else{
            setNextCheckAll(true)
            active = '1'
        }
        
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=checkAll&active=${active}`)
        .then(response => response.text())
        .then((response) => {
            getAllNextOrder()
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleCheck = (e) =>{
        let cart_id = e.currentTarget.getAttribute('id')
        let value = e.currentTarget.getAttribute('value')
        
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=check&active=${value}&cart_id=${cart_id}`)
        .then(response => response.text())
        .then((response) => {
           getAllNextOrder()
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const handleEdit = (e) => {
        let cartId = e.currentTarget.getAttribute('value')
        setLoadingProductView(true)
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/product/get-id?id=${cartId}`)
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
        setSidebarProductView(true)
        setSidebarWishList(false)
    }

    const handleRemove = (e) =>{
        let cart_id = e.currentTarget.getAttribute('value')
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=remove&cart_id=${cart_id}`)
        .then(response => response.text())
        .then((response) => {
           getAllNextOrder()
        })
        .catch((error) => {
           console.log(error);
        });
    }
    
    const handleRemoveAll = (e) =>{
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=removeAll`)
        .then(response => response.text())
        .then((response) => {
           getAllNextOrder()
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const handleProceedCart = () => {
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=nextToCart`)
        .then(response => response.text())
        .then((response) => {
           getAllNextOrder()
           getAllCart()
        })
        .catch((error) => {
           console.log(error);
        });
    }
  
    return ( 
        <>  
            <div className="container-fluid d-flex flex-row-reverse p-0">
                <div className={!sidebarWishList ? 'sidebarCart cartMainContanier':'sidebarCart-active bg-white border-10 shadow cartMainContanier'}>
                    <div className="d-flex flex-row-reverse" onClick={handleClose}><i className="fas fa-times-circle asdasd float-right"  aria-hidden="true" ></i></div>
                    <div className="row m-0">
                        <div type="button" className={`col-12 text-center p-4 border border-right-0 border-top-0 ${showCart ? ' cartColor ': 'c-red'}`} value="cart" onClick={onChangeHandle}>
                            <div><i className="fas fa-shopping-cart pr-2" ></i>VIEW WISHLIST CART</div>
                        </div>
                    </div>
                    <div className="container-fluid p-0 cart" >
                        <div className="container m-2 row align-items-center" hidden={nextOrder.length > 0 ? false:true}>
                            <div className="col-3 col-md-4 c-red">Wishlist</div>
                            <div className="col-9 col-md-8 align-items-center">
                                <div className="cartFlex d-flex justify-content-around c-grey f-13 align-items-center">
                                    <div className="pr-2 mt-1"><Checkbox disabled={nextOrder.length > 0 ? false:true}  checked={nextCheckAll ?true:false} onClick={handleCheckAll} size="small" name="checkedB" color="secondary" /> SELECT ALL</div>
                                    <div onClick={handleRemoveAll} className="border border-secondary border-right-0 border-top-0 border-bottom-0 pl-3">REMOVE ALL ITEM<i className="fas fa-trash pl-2 "></i></div>
                                </div>
                            </div>
                        </div><hr/>
                        <div className="cartContainer containerScroll">
                            {nextOrder.map((c,i) => (
                                <div key={c.id}>
                                    <div  className="cartBody d-flex justify-content-between align-items-center" >
                                        <div className="cartCheck"><Checkbox onChange={e =>handleCheck(e)} value={c.active} id={`${c.id}`} checked={c.active == '1' ? true : false}  size="small"  color="secondary" /></div>
                                        <div className="border-10 cartImg"  style={{
                                            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                                            }}>
                                        </div>
                                        <div className="d-flex flex-column align-content-between cartName ml-1">
                                            <div className=" f-14">{c.product}</div>
                                            <div className="c-red f-14">P {parseFloat(c.unit_price).toFixed(2)}</div>
                                            <del className="c-grey f-10">P {parseFloat(c.unit_price).toFixed(2)}</del>
                                        </div>
                                        <div className="cartFlex d-flex justify-content-between cartPrice ml-1">
                                            <div className="f-14">{c.quantity}x</div>
                                            <div className="c-red f-14 ">P {parseFloat(c.total_price).toFixed(2)}</div>
                                        </div>
                                        <div className="pr-2 d-flex flex-column align-content-between cartAction align-items-center">
                                            <Link to="/" className="c-green">
                                                <div className="f-14" onClick={handleEdit} value={c.product_id}><i className="fas fa-edit"></i></div>
                                            </Link>
                                            <div onClick={handleRemove} value={c.id}><i className="fas fa-trash"></i></div>
                                        </div>
                                    </div><hr/>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between m-4">
                            <div><strong>SubTotal</strong> :</div>
                            <div className="c-red"><strong>P {nextOrder.length > 0 ?(nextSubtotal).toLocaleString(navigator.language, { minimumFractionDigits: 2 }) : '0.00'}</strong></div>
                        </div>
                        <div className="row pr-3">
                            <div className="col-2 col-md-7"></div>
                            <div className="col-10 col-md-5 ">
                                <Button hidden={nextOrder.length > 0 ? false:true} onClick={handleProceedCart} variant="contained" className={`btn-block c-white cartColor ${classes.button}`} >
                                    Proceed To Cart
                                </Button>
                            </div>
                            <div className="col-12">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default SideWishlist;