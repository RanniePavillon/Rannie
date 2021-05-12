import { createContext } from 'react';
import { useState} from 'react'

export const ProductContext = createContext();

export const ProductProvider = (props) => {

    const [productData,setProductData] = useState([])
    const [totalPrice , setTotalPrice] = useState('0.00')
    const [productId,setProductId] = useState([])
    const [loadingProductView,setLoadingProductView] = useState(false)
    const [checkCartData,setCheckCartData] = useState([])
    const [quantity, setQuantity] = useState({prod_quantity: 1,});
    // CART DATA
    const [cartData,setCartData] = useState([])
    const [cartSubtotal,setCartSubtotal] = useState('0.00')
    const [cartCheckAll,setCartCheckAll] = useState(true)
    const [cartQuantity,setCartQuantity] = useState('0.00')

    // MY NEXT ORDER
    const [nextOrder,setNextOrder] = useState([])
    const [nextSubtotal,setNextSubtotal] = useState('0.00')
    const [nextCheckAll,setNextCheckAll] = useState(true)
    
    return (
        <ProductContext.Provider 
        value={{
            next_check_all:[nextCheckAll,setNextCheckAll],
            next_order:[nextOrder,setNextOrder],
            next_subtotal:[nextSubtotal,setNextSubtotal],
            prod_quantity:[quantity,setQuantity],
            loading_prod_view:[loadingProductView,setLoadingProductView],
            product_id:[productId,setProductId],
            product_data:[productData,setProductData],
            total_price:[totalPrice,setTotalPrice],
            cart_data:[cartData,setCartData],
            check_cart:[checkCartData,setCheckCartData ],
            cart_check_all:[cartCheckAll,setCartCheckAll],
            cart_subtotal:[cartSubtotal,setCartSubtotal],
            cart_quantity:[cartQuantity,setCartQuantity], 
        }}>
        {props.children}    
        </ProductContext.Provider>
    )
}

