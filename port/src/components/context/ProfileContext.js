import { createContext } from 'react';
import { useState} from 'react'

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
    const [myProfile , setMyProfile] = useState([])
    
    return (
        <ProfileContext.Provider value={{profile:[myProfile , setMyProfile]}}>
            {props.children}    
        </ProfileContext.Provider>
    )
}

