import { Link, useHistory} from 'react-router-dom'
import { useState,useContext,useEffect } from 'react';
import axios from "axios";
import moment from 'moment';

// import Snackbar from '@material-ui/core/Snackbar';
import {makeStyles, Checkbox, Button} from '@material-ui/core';

import swal from 'sweetalert';

import { SideContext } from '../context/SideContext';
import { ProductContext } from '../context/ProductContext';
import { ProfileContext } from '../context/ProfileContext';

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none"
    },
    textField: {
        width: 100
    },
}));

const SideCart = ({getAllCart , getAllNextOrder}) => {
    const classes = useStyles();
    const {cart,view_cart,productView}  = useContext(SideContext)
    const [sidebarCart,setSidebarCart] = cart
    const [showCart , setShowCart] = view_cart
    const [sidebarProductView,setSidebarProductView] = productView
    
    const {cart_data,cart_subtotal,cart_quantity,check_cart,cart_check_all,product_data,loading_prod_view,prod_quantity}  = useContext(ProductContext)
    const [cartData,setCartData] = cart_data
    const [cartSubtotal,setCartSubtotal] = cart_subtotal
    const [checkCartData , setCheckCartData] = check_cart
    const [cartCheckAll,setCartCheckAll] = cart_check_all
    const [cartQuantity,setCartQuantity] = cart_quantity

    const [productData,setProductData] = product_data
    const [loadingProductView,setLoadingProductView] = loading_prod_view
    const [quantity, setQuantity] = prod_quantity

    const {profile}  = useContext(ProfileContext)
    const [myProfile] = profile

    const handleClose = () =>{
        setSidebarCart(false)
    }

    const handleCheck = (e) => {
        let cart_id = e.currentTarget.getAttribute('id')
        let value = e.currentTarget.getAttribute('value')
        
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=cart&status=check&active=${value}&cart_id=${cart_id}`)
        .then(response => response.text())
        .then((response) => {
           getAllCart()
        })
        .catch((error) => {
            swal("Something went wrong ", {
                icon: "warning",
                button:false,
                timer:1000,
            });
        });
    };

    const handleCheckAll = () => {
        let active;
        if (cartCheckAll == true) {
            setCartCheckAll(false)
            active = '0'
        }else{
            setCartCheckAll(true)
            active = '1'
        }
        
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=cart&status=checkAll&active=${active}`)
        .then(response => response.text())
        .then((response) => {
           getAllCart()
        })
        .catch((error) => {
            swal("Something went wrong ", {
                icon: "warning",
                button:false,
                timer:1000,
            });
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
        setSidebarCart(false)
    }

    const handleRemove = (e,index) =>{
        let cartId = e.currentTarget.getAttribute('value')
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=cart&status=remove&cart_id=${cartId}`)
        .then(response => response.text())
        .then((response) => {
           getAllCart()
        })
        .catch((error) => {
            swal("Something went wrong ", {
                icon: "warning",
                button:false,
                timer:1000,
            });
        });
    }
    const handleRemoveAll = (e) =>{
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=cart&status=removeAll`)
        .then(response => response.text())
        .then((response) => {
           getAllCart()
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const handleToCheckout = (e) => {
        let array = [];
        if ((cartSubtotal == '0.00') || (cartData.length == 0)) {
            console.log('cannot proceed');
        }else{
            let quantity = 0;
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i]['active'] == '1') {
                    quantity += parseFloat(cartData[i]['quantity'])
                    array.push(cartData[i])
                }
                setCheckCartData(array)
                setCartQuantity(quantity)
            }
            (e.currentTarget.getAttribute('value') === 'cart'? setShowCart(true) : setShowCart(false))
        }
    }
    
    const history = useHistory()
    const handleSubmit = (e) =>{
        e.preventDefault()
        
        swal({
            title: "Are you sure?",
            text: "This action can be undo or revert once done",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal({
                    title: "Please give us a moment!",
                    text: "This may take a seconds depending on the size of the data and/or your network connection",
                    icon: "success",
                    button:false,
                    timer:1000,
                });
                var myHeaders = new Headers();
                myHeaders.append("Content-type","application/json");

                const post = {checkCartData , myProfile , cartTotal:cartSubtotal , date:moment(new Date()).format('Y-MM-D h:mm:ss')}
                var raw = JSON.stringify(post)
                var requestOptions = {
                    method:'POST',
                    headers:myHeaders,
                    body:raw,
                    redirect:'follow',
                };
                fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/cart-checkout`, requestOptions)
                .then(response => response.text())
                .then((response) => {
                    // console.log(response);
                    // return
                    if (JSON.parse(response).msg === "failed") {
                        swal("Received # already exist ! ", {
                            icon: "warning",
                            button:false,
                            timer:1000,
                        });
                    } else {
                        swal({
                            title: "Please give us a moment!",
                            text: "This may take a seconds depending on the size of the data and/or your network connection",
                            icon: "success",
                            button:false,
                            timer:1000,
                        });
                        getAllCart()
                        setShowCart(true)
                        setSidebarCart(true)
                        setCartSubtotal('0.00')
                        history.push('/my-orders')
                    }
                })
                .catch((error) => {
                    swal("Something went wrong ", {
                        icon: "warning",
                        button:false,
                        timer:1000,
                    });
                });
            } else {
                swal("Woops, Transaction has been cancelled !");
            }  
        });
    }
    
    const viewCart = cartData.map((c,i)=>
        <div key={c.id}>
            <div  className="cartBody d-flex justify-content-between align-items-center" >
                <div className="cartCheck"><Checkbox  value={c.active} id={`${c.id}`} checked={c.active == '1' ? true : false} onChange={e =>handleCheck(e)} size="small"  color="secondary" /></div>
                <div className="border-10 cartImg"  style={{
                    backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                    }}>
                </div>
                <div className="d-flex flex-column align-content-between cartName ml-1">
                    <div className=" f-14">{c.product}</div>
                    <div className="c-red f-14">P {parseFloat(c.unit_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                    <del className="c-grey f-10">P {parseFloat(c.unit_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</del>
                </div>
                <div className="cartFlex d-flex justify-content-between cartPrice ml-1">
                    <div className="f-14">{c.quantity}x</div>
                    <div className="c-red f-14 ">P {parseFloat(c.total_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="pr-2 d-flex flex-column align-content-between cartAction align-items-center">
                    <Link to="/" className="c-green">
                        <div className="f-14" onClick={handleEdit} value={c.product_id}><i className="fas fa-edit"></i></div>
                    </Link>
                    <div onClick={handleRemove} value={c.id}><i className="fas fa-trash"></i></div>
                </div>
            </div><hr/>
        </div>
    )
    const checkOut = checkCartData.map((c,i)=>
        <div key={c.id}>
            <div  className="cartBody d-flex justify-content-between align-items-center" >
                <div className="cartCheck"></div>
                <div className="border-10 cartImg"  style={{
                    backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                    }}>
                </div>
                <div className="d-flex flex-column align-content-between cartName">
                    <div className=" f-14">{c.product}</div>
                    <div className="c-red f-14">P {parseFloat(c.unit_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                    <del className="c-grey f-13">P 0.00</del>
                </div>
                <div className=" cartFlex d-flex justify-content-between cartPrice ml-1">
                    <div className="f-14">{c.quantity}x</div>
                    <div className="c-red f-14 ">P {parseFloat(c.total_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                </div>
                <div></div>
            </div><hr/>
        </div>
    )

    return ( 
        <>  
            <div className="container-fluid d-flex flex-row-reverse p-0 ">
                <div className={!sidebarCart ? 'sidebarCart cartMainContanier':'sidebarCart-active bg-white border-10 shadow cartMainContanier'}>
                    <div className="d-flex flex-row-reverse" onClick={handleClose}><i className="fas fa-times-circle asdasd float-right"  aria-hidden="true" ></i></div>
                    <div className="row m-0 ">
                        <div type="button" className={`col-6 text-center p-3 p-md-4 border border-right-0 border-top-0 ${showCart ? ' cartColor ': 'c-red'}`} value="cart">
                            <div><i className="fas fa-shopping-cart pr-2" ></i>VIEW CART</div>
                        </div>
                        <div type="button" className={`col-6 text-center border border-right-0 border-top-0 p-3 p-md-4 ${!showCart ? 'cartColor ': 'c-red'}`} value="checkout" >
                            <div><i className="fas fa-shopping-cart pr-2 "></i>CHECKOUT</div>
                        </div>
                    </div>
                    {showCart ? (
                        <div className="container-fluid p-0 cart">
                            <div className="row mt-1 mt-md-2 align-items-center" hidden={cartData.length > 0 ? false:true }>
                                <div className="col-5 col-md-4 c-red text-center">Orderlist</div>
                                <div className="col-7 col-md-8 align-items-center">
                                    <div className="cartFlex d-flex justify-content-around c-grey f-13 align-items-center">
                                        <div className="pr-2 mt-1"><Checkbox checked={cartCheckAll ?true:false} onClick={handleCheckAll} size="small" name="checkAll" color="secondary" /> SELECT ALL</div>
                                        <div onClick={handleRemoveAll} className="border border-secondary border-right-0 border-top-0 border-bottom-0 pl-3">REMOVE ALL ITEM<i className="fas fa-trash pl-2 "></i></div>
                                    </div>
                                </div>
                            </div><hr/>
                            <div className="cartContainer containerScroll">
                                {viewCart}
                            </div>
                            <div className="d-flex justify-content-between m-4">
                                <div><strong>SubTotal</strong> :</div>
                                <div className="c-red"><strong>P {cartData.length > 0 ? parseFloat(cartSubtotal).toLocaleString(navigator.language, { minimumFractionDigits: 2 }) : '0.00'}</strong></div>
                            </div>
                            <div className="row pr-3">
                                <div className="col-4 col-md-7"></div>
                                <div className="col-8 col-md-5 ">
                                    <Button variant="contained" value="checkout" onClick={e=>handleToCheckout(e)} className={`btn-block c-white cartColor ${classes.button}`} >
                                        Proceed To Check out
                                    </Button>
                                </div>
                                <div className="col-12">&nbsp;</div>
                                <div className="col-12">&nbsp;</div>
                            </div>
                        </div>
                    ):(
                        <form onSubmit={handleSubmit}>
                            <div className="container-fluid p-0 checkout mt-3" >
                                <div className="container row align-items-center">
                                    <div className="col-8 c-red f-14"><strong>Delivery Details</strong><i className="fas fa-map-marker-alt pl-2"></i></div>
                                    <div className="col-4"><div className="c-grey f-13 align-items-center">CHANGE<i className="fas fa-exchange-alt c-red pl-2"></i></div></div>
                                    <div className="col-12 f-14 mt-1"><strong>{myProfile[0].first_name} {myProfile[0].middle_name} {myProfile[0].last_name}</strong></div>
                                    <div className="col-12 f-12 mt-1 c-grey">(+63) {myProfile[0].phone_number}</div>
                                    <div className="col-12 f-12 mt-1 "><strong>Address</strong><span> ({myProfile[0].detailed_address} , {myProfile[0].barangay}, {myProfile[0].city})</span></div>
                                </div><hr/>
                                <div className="c-red f-14 container"><strong>Checkout Products</strong></div>
                                <div className="checkoutContainer containerScroll">
                                    {checkOut}
                                </div>
                                <div className="container-fluid border mt-2">
                                    <div className="d-flex justify-content-between m-2 ml-2 mr-2 f-14">
                                        <div><strong>Order Total (<span className="c-red">{cartQuantity}x</span> item)</strong></div>
                                        <div className="c-red"><strong>P {parseFloat(cartSubtotal).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong></div>
                                    </div>
                                    <div className="d-flex justify-content-between m-2 ml-2 mr-2 f-14">
                                        <div><strong><i className="fas fa-file pr-2 "></i>Shipping Fee</strong></div>
                                        <div><strong>{parseFloat(myProfile[0].fee).toFixed(2)}</strong></div>
                                    </div>
                                </div>
                                <div className="row m-2 f-14">
                                    <div className="col-12">
                                        <div>Messages :</div>
                                        <div>
                                            <textarea name="" placeholder="(Optional) " cols="30" className="form-control f-14" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <div className="c-red f-14"><strong>Payment Method</strong></div>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="contained" color="secondary" size="small" className="border-15">
                                            <span className="f-10">Cash on Delivery</span>
                                            </Button>
                                            <Button variant="contained" size="small" className="border-15">
                                                <span className="f-10">Credit/Debit Card</span>
                                            </Button>
                                            <Button variant="contained" size="small" className="border-15">
                                                <span className="f-10">Payment</span>
                                            </Button>
                                            <Button variant="contained" size="small" className="border-15">
                                                <span className="f-10">Online Payment</span>
                                            </Button>
                                            
                                        </div>
                                    </div>
                                </div><hr/>
                                <div className="container-fluid">
                                    <div className="d-flex justify-content-between m-2 ml-2 mr-2 f-14">
                                        <div><strong>Merchandise SubTotal</strong></div>
                                        <div><strong>P {parseFloat(cartSubtotal).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong></div>
                                    </div>
                                    <div className="d-flex justify-content-between m-2 ml-2 mr-2 f-14">
                                        <div><strong><i className="fas fa-file pr-2 "></i>Shipping Fee</strong></div>
                                        <div className=""><strong>{parseFloat(myProfile[0].fee).toFixed(2)}</strong></div>
                                    </div>
                                    <div className="d-flex justify-content-between m-2 ml-2 mr-2 ">
                                        <div className="c-red"><strong>Total Payment</strong></div>
                                        <div className="c-red"><strong>{parseFloat(cartSubtotal - myProfile[0].fee).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong></div>
                                    </div>
                                </div>
                                <div className="row p-3">
                                    <div className="col-6">
                                        <Button onClick={handleToCheckout} value="cart" variant="contained" className={`btn-block c-white cartColor ${classes.button}`} >
                                            View Cart
                                        </Button>
                                    </div>
                                    <div className="col-6">
                                        <Button type="submit" variant="contained" className={`btn-block c-white ${classes.button}`} style={{backgroundColor:"#218838"}}>
                                            Place Order
                                        </Button>
                                    </div>
                                    <div className="col-12">&nbsp;</div>
                                    <div className="col-12">&nbsp;</div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
 
export default SideCart;