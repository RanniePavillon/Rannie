import { createContext } from 'react';
import { useState} from 'react'

export const MyOrderContext = createContext();

export const MyOrderProvider = (props) => {
    const [myProduct , setMyProduct] = useState([])
    
    return (
        <MyOrderContext.Provider value={{my_order:[myProduct,setMyProduct]}}>
            {props.children}    
        </MyOrderContext.Provider>
    )
}

