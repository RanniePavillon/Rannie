import { createContext } from 'react';
import { useState} from 'react'

export const SideContext = createContext();

export const SideProvider = (props) => {

    const [sidebarCart,setSidebarCart] = useState(false);
    const [sidebarWishlist,setSidebarWishlist] = useState(false);
    const [settingToggle, setSettingToggle] = useState(false);
    const [sidebarProductView,setSidebarProductView] = useState(false);
    const [sidebarLeft,setSidebarLeft] = useState(false);
    const [showCart , setShowCart] = useState(true)
    const [cartCount , setCartCount] = useState([])
    const [nextOrderCount , setNextOrderCount] = useState([])
    
    
    return (
        <SideContext.Provider value={{next_count:[nextOrderCount,setNextOrderCount],cart_count:[cartCount,setCartCount],view_cart:[showCart,setShowCart],sidebar:[sidebarLeft,setSidebarLeft],cart:[sidebarCart,setSidebarCart],wishlist:[sidebarWishlist,setSidebarWishlist],setting:[settingToggle,setSettingToggle],productView:[sidebarProductView,setSidebarProductView]}}>
            {props.children}    
        </SideContext.Provider>
    )
}

