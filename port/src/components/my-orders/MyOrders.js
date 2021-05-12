import React, { useState,useContext,useEffect} from "react";
import axios from "axios";

import Sidebar from '../layouts/Sidebar'
import '../../layouts/css/content/my-orders/style.css';

import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { MyOrderContext } from '../context/MyOrderContext';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none"
  },
  textField: {
    width: 100
  },
}));

const MyOrders = () => {
    const classes = useStyles();
    
    const {my_order}  = useContext(MyOrderContext)
    const [myProduct,setMyProduct] = my_order
    
    const[transData , setTransData] = useState([])

    const checkCartData = () => {
        axios.all([
            axios.get('https://u8rplupvcl.execute-api.ap-southeast-1.amazonaws.com/development/my-orders/get-id'),
        ])
        .then(response =>{
            setTransData(response[0].data.transData)
            setMyProduct(response[0].data.prodData)
        })
        .catch(err => {
            console.log(err);
        })
    } 

    useEffect(() => {
       checkCartData()
    }, [])
    return ( 
        <div className="mainContainer">
            <div className="d-flex">
                <Sidebar/>
                <div className="myOrdersContainer">
                    <div className="container-fluid bg-white shadow border-10 sticky-top-my-order">
                        <div className="c-grey f-20">List of Order</div><br/>
                        <div className="container-fluid p-0">
                            <div className="my-body-container bg-light p-2 border-10 d-flex c-grey">
                                <div className="my-product-details ">
                                    <div className="d-flex justify-content-between align-items-center ">
                                       <div className="my-product-image d-none d-md-block"></div>
                                        <div className="my-product">Product</div>
                                        <div className="my-unit-price">
                                            <span className="d-none d-md-block">Unit Price</span>
                                            <span className="d-md-none d-block">U.Price</span>
                                        </div>
                                        <div className="my-quantity">
                                            <span className="d-none d-md-block">Quanity</span>
                                            <span className="d-md-none d-block">Qty</span>
                                        </div>
                                        <div className="my-price">Price</div>
                                    </div>
                                </div>
                                <div className="my-order-details text-center ml-3 d-none d-md-block">Order Details</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow border-10 my-order-scroll my-order ">
                        {transData.map((t,i)=>(
                            <div className="my-body-container align-items-center bg-e9f7f7 d-md-flex p-2 mt-3  mb-3" key={i}>
                                <div className="my-product-details my-product-scroll align-items-center">
                                    {myProduct.map((p,v)=>(
                                        t.id === p.order_id ? (
                                            <div className="d-flex justify-content-between align-items-center mt-1" key={v}>
                                                <div className="my-product-image border-10 d-none d-md-block"  style={{
                                                    backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100%',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                                                }}></div>
                                                <div className="my-product ml-2"><strong>{p.product}</strong></div>
                                                <div className="my-unit-price">P {parseFloat(p.unit_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                                                <div className="my-quantity">{p.quantity}x</div>
                                                <div className="my-price">P {parseFloat(p.total_price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</div>
                                            </div>
                                        ):null
                                    ))}
                                </div>
                                <div className="my-order-details ml-1">
                                    <div className="d-flex justify-content-between " key={t.id}>
                                        <div className="">
                                            <div><strong>Tracking Number:</strong></div>
                                            <div className="f-14">Shipping Fee: </div>
                                            <div className="f-14">Additional Shipping Fee: </div>
                                            <div><strong>Total Payment:</strong></div>
                                            <div><strong>Placed on:</strong></div>
                                            <div><strong>Payment Process:</strong></div>
                                        </div>
                                        <div className="">
                                            <div>{t.series_num}</div>
                                            <div className="f-14">P {parseFloat(t.shipping_fee).toFixed(2)}</div>
                                            <div className="f-14">P 0.00</div>
                                            <div><strong>P {parseFloat(t.total_amount).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong></div>
                                            <div className="f-14">{t.created_at}</div>
                                            <div className="f-14">COD <Button variant="contained" size="small" className={`bg-warning border-15 f-9 ${classes.button}`} >Change Payment</Button></div>
                                        </div>
                                    </div>
                                    <div>
                                        <strong>Status:</strong>
                                        <span>
                                            {t.status === 'Checkout'?(
                                                    <Button variant="contained" size="small" className={`bg-success border-15 m-1 c-white f-10 ${classes.button}`} disabled>Ordered</Button>
                                                ):(t.status === 'Preparing'?(
                                                    <Button variant="contained" size="small" className={`bg-success border-15 m-1 c-white f-10 ${classes.button}`} disabled>Preparing</Button>
                                                ):(
                                                    <>
                                                        <Button variant="contained" size="small" className={`bg-success border-15 m-1 c-white f-10 ${classes.button}`} disabled>Delivered</Button>
                                                        <Button variant="contained" size="small" className={`border-15 m-1  f-10 ${classes.button}`} color="secondary">Re-Order</Button>
                                                        <Button variant="contained" size="small" className={`bg-warning border-15 m-1  f-10 ${classes.button}`}>Rate</Button>
                                                    </>
                                                ))
                                            }
                                            {t.status !== 'Delivered'?(
                                                <Button variant="contained" size="small" className={`border-15 f-10 ${classes.button}`} color="secondary">Cancel</Button>
                                                ):''
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 d-md-none d-block">&nbsp;</div>
                    <div className="col-12 d-md-none d-block">&nbsp;</div>
                </div>
            </div>
        </div>
    );
}
 
export default MyOrders;