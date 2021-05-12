import { Link  } from 'react-router-dom'
import { motion} from "framer-motion"
import { useContext ,useEffect,useState } from 'react';

import PofshopIcon from '../../layouts/images/pofShop.png';
import { SideContext } from '../context/SideContext';
import { ProductContext } from '../context/ProductContext';

import { makeStyles , Avatar , List , ListItem , ListItemIcon , ListItemText , Badge} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/MoveToInbox';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    badge:{
        padding:'0px 0px !important',
        color:'#FFFFFF !important',
        top:-18,
        right:-5,
        '&:hover':{
            background:'#FFFFFF !importan'
        },
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const slideVerticalAnimation = {
        open: {
            rotateX: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                mass: 0.8,
                type: "string"
            },
            display: "block"
        },
        close: {
            rotateX: -35,
            y: -320,
            opacity: 0,
            transition: {
                duration: 0.3
            },
            transitionEnd: {
                display: "none"
            }
        }
    };
   
    const {next_count,sidebar,cart,wishlist,setting,productView,cart_count}  = useContext(SideContext)
    const [sidebarWishList,setSidebarWishList] = wishlist
    const [sidebarCart,setSidebarCart] = cart
    const [settingToggle, setSettingToggle] = setting
    const [sidebarProductView,setSidebarProductView] = productView
    const [sidebarLeft, setSidebarLeft] = sidebar
    const [cartCount , setCartCount] = cart_count
    const [nextOrderCount , setNextOrderCount] = next_count


    const {cart_data,next_order}  = useContext(ProductContext)
    const [cartData] = cart_data
    const [nextOrder] = next_order
    
    const showSidebarLeft = () => {
        setSidebarLeft(!sidebarLeft)
    };

    const showToggleDropdown = () => {
        setSidebarCart(false)
        setSidebarWishList(false)
        setSidebarProductView(false)
        setSettingToggle(!settingToggle)
    };

    const showSidebarCart = () => {
        setSidebarWishList(false)
        setSettingToggle(false)
         setSidebarProductView(false)
        setSidebarCart(!sidebarCart)
    };
    
    const showSidebarWishlist = () => {
        setSidebarCart(false)
        setSettingToggle(false)
        setSidebarProductView(false)
        setSidebarWishList(!sidebarWishList)
    };

    const [showMyOrder , setShowMyOrder] = useState(false)
    const handleMyOrder = () =>{
        setShowMyOrder(true)
        setSidebarCart(false)
        setSettingToggle(false)
        setSidebarProductView(false)
        setSidebarWishList(false)
    }
    useEffect(() => {
        let count = cartData.length
        setCartCount(count)
        let nextCount = nextOrder.length
        setNextOrderCount(nextCount)
    }, [cartData , next_order])
  
    return ( 
        <>
            <nav id="navbar" className="c-c72c41 d-none d-md-block">
                <div className="text-left position-absolute pl-2">
                    <span className="navbar-brand" ><img id="main-logo" src={PofshopIcon} alt="PoFShop" /><strong id="main-name" className="c-white"> &nbsp; POFSHOP</strong></span>
                </div>
                <div className="text-right pr-2">
                    <span className="pof-btn c-white" id="pof=personal" ><strong>My Personal</strong></span>
                    <span className="pof-btn pof-category c-white" id="pof-business" ><strong>My Business</strong></span>
                </div>
            </nav>
            <div id="menubar" className="d-flex ">
                <div id="L-menu" className="d-sm-block">
                    <span>Menu</span>
                    <i className="fas fa-bars float-right" onClick={showSidebarLeft} id="menu"></i>
                </div>
                <div id="C-menu" className="d-flex justify-content-between">
                    <div id="menu-search">
                        <i className="fas fa-search c-grey" id="search-btn"></i>
                        <input type="text" placeholder="Search..." id="nav-search" />   
                    </div>
                    <div id="menu-cart">
                        <Link to="/my-orders" className="c-black" onClick={handleMyOrder}>
                            <span className={showMyOrder ? 'nav-cart':''}>
                                <i className="fas fa-list-alt pr-2" id="nav-wishlist"></i>
                                My Orders
                            </span>
                        </Link>
                        <span className={sidebarWishList ? 'nav-cart':''} onClick={showSidebarWishlist}>
                            <i className="fas fa-heart pr-2" id="nav-wishlist"></i>
                            My Wishlist
                            {nextOrderCount > 0 ? <Badge className={classes.badge} badgeContent={`${nextOrderCount}`} max={50}  color="secondary"/>: null}
                        </span>
                        <span className={sidebarCart ? 'nav-cart':''}  onClick={showSidebarCart} >
                            <i className="fas fa-shopping-cart pr-2" id="nav-cart"></i>
                            My Cart
                            {cartCount > 0 ? <Badge className={classes.badge} badgeContent={`${cartCount}`} max={50}  color="secondary"/>: null}
                        </span>
                    </div>
                </div>
                <div id="R-menu" >
                    <i className="fas fa-user pr-2 pt-1"></i>
                    <span id="name">Rannie&nbsp;Pavillon</span>
                    <span id="email">Young Professional</span>
                    <i className="fas fa-bars float-right"  onClick={showToggleDropdown}  data-toggle="dropdown"></i>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button"><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                </div>
            </div>
            <motion.div
                className="dropdown-container shadow bg-white float-right d-none d-lg-block"
                initial="close"
                animate={settingToggle ? "open" : "close"}
                variants={slideVerticalAnimation}
            >
                <List>
                    <Link to="/my-profile" className="c-black">
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >My Profile</ListItemText >
                        </ListItem>
                    </Link>
                    <Link to="/my-address" className="c-black">
                        <ListItem button >
                             <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >My Address</ListItemText >
                        </ListItem>
                    </Link>
                    <Link to="/my-coins" className="c-black">
                        <ListItem button >
                             <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >My Coins</ListItemText >
                        </ListItem>
                    </Link>
                    <Link to="/my-orders" className="c-black">
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >My Orders</ListItemText >
                        </ListItem>
                    </Link>
                    <Link to="/logout" className="c-black">
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >Log out</ListItemText >
                        </ListItem>
                    </Link>
                </List>
            </motion.div>

            {/* MOBILE */}
            <nav id="navbar" className="c-c72c41 d-md-none fixed-top">
                <div className=" mt-2 d-md-block d-flex justify-content-between">
                    <div>
                        <i className="fas fa-bars m-2 c-white" onClick={showSidebarLeft} id="menu"></i>
                        <span className="c-white">POFSHOP</span>
                    </div>
                    <div>
                        <i className="fas fa-search m-2 c-white"></i>
                        <i className="fas fa-bell m-2 c-white"></i>
                    </div>
                </div>
            </nav>
            <nav className="d-md-none fixed-bottom">
                <div className="container-fluid bg-white shadow">
                    <div className="d-flex justify-content-between">
                        <div className="mt-2 mb-2"><i className="fas fa-home"></i></div>
                        <div className="mt-2 mb-2"><i className="fas fa-cog"></i></div>
                        <div className="mt-2 mb-2" onClick={showSidebarCart}><i className="fas fa-shopping-cart"></i></div>
                        <div className="mt-2 mb-2" onClick={showSidebarWishlist}><i className="fas fa-heart"></i></div>
                        <div className="mt-2 mb-2"><Avatar src="/broken-image.jpg" className={classes.small} /></div>
                        
                    </div>
                </div>
            </nav>
            {/* <div className="mainContainer ">
                <SideCart/>
                <SideWishList/>
                <div className="d-flex ">
                    <Sidebar/>
                    <DashboardIndex/>
                </div>
            </div> */}
        </>
    );
}
 
export default Navbar;