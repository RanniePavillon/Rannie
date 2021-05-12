import { useContext,useEffect} from 'react';
import axios from "axios";

import DashboardIndex from './dashboard/Index'
import Sidebar from './layouts/Sidebar'
import SideCart from './cart/SideCart'
import SideWishList from './wishlist/SideWishlist'

import { ProductContext } from './context/ProductContext';
import { ProfileContext } from './context/ProfileContext';

const Index = () => {
    const {next_order,next_subtotal,next_check_all,cart_data,cart_subtotal,cart_check_all}  = useContext(ProductContext)
    const [cartData,setCartData] = cart_data
    const [cartSubtotal,setCartSubtotal] = cart_subtotal
    const [cartCheckAll,setCartCheckAll] = cart_check_all

    const [nextOrder,setNextOrder] = next_order
    const [nextSubtotal,setNextSubtotal] = next_subtotal
    const [nextCheckAll,setNextCheckAll] = next_check_all

    const {profile} = useContext(ProfileContext)
    const [myProfile,setMyProfile] = profile

    const getAllCart = () =>{
        axios.all([
            axios.get('https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=cart&status=all'),
        ])
        .then(response =>{
            setCartData(response[0].data)
            let check = false;
            let total = 0;   
            let cartData = response[0].data
            for (let i = 0; i < cartData.length; i++) {  
                if (cartData[i]['active'] == '0') {
                    check = true 
                } 
                if (cartData[i]['active'] == '1') {
                    total+=parseFloat(cartData[i]['total_price'])
                }
                setCartSubtotal(total.toFixed(2))
            }
            (check? setCartCheckAll(false) :  setCartCheckAll(true))
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getAllNextOrder = () =>{
        axios.all([
            axios.get('https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/get-cart-item?featured_name=next&status=all'),
        ])
        .then(response =>{
            setNextOrder(response[0].data)
            let check = false;
            let nextTotal = 0;  
            let nextData = response[0].data
            for (let i = 0; i < nextData.length; i++) {   
                if (nextData[i]['active'] == '0') {
                    check = true 
                }
                if (nextData[i]['active'] == '1') {
                    nextTotal+=parseFloat(nextData[i]['total_price'])
                }
                setNextSubtotal(nextTotal.toFixed(2))
            }
            (check? setNextCheckAll(false) : setNextCheckAll(true))
        })
        .catch(err => {
            console.log(err);
        })
    }
    const getProfile = () =>{
        axios.all([
            axios.get('https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/profile/get-id'),
        ])
        .then(response =>{
            setMyProfile(response[0].data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
       getAllCart()
       getAllNextOrder()
       getProfile()
    },[])
 
    return ( 
        <>
            <div className="mainContainer">
                <SideCart getAllCart={getAllCart} getAllNextOrder={getAllNextOrder} getProfile={getProfile}/>
                <SideWishList getAllCart={getAllCart} getAllNextOrder={getAllNextOrder}/>
                <div className="d-flex">
                    <Sidebar/>
                    <DashboardIndex getAllCart={getAllCart} getAllNextOrder={getAllNextOrder}/>
                </div>
            </div>
        </>
    );
}
 
export default Index;