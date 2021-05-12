
// import PofshopIcon from '../../layouts/images/pofShop.png';


// const Dashboard = () => {
//     return ( 
//         <>
//             <nav id="navbar" className="c-c72c41 d-none d-md-block">
//                 <div className="text-left position-absolute pl-2">
//                     <span className="navbar-brand" ><img id="main-logo" src={PofshopIcon} alt="PoFShop" /><strong id="main-name" className="c-white"> &nbsp; POFSHOP</strong></span>
//                 </div>
//                 <div className="text-right pr-2">
//                     <span className="pof-btn c-white" id="pof=personal" ><strong>My Personal</strong></span>
//                     <span className="pof-btn pof-category c-white" id="pof-business" ><strong>My Business</strong></span>
//                 </div>
//             </nav>
//             <div id="menubar" className="d-flex">
//                 <div id="C-menu" className="d-flex justify-content-between">
//                     <div id="menu-search">
//                         <i className="fas fa-search c-grey" id="search-btn"></i>
//                         <input type="text" placeholder="Search..." id="nav-search" />   
//                     </div>
//                 </div>
//                 <div id="R-menu" >
//                     <i className="fas fa-user pr-2 pt-1"></i>
//                     <span id="name">Rannie&nbsp;Pavillon</span>
//                     <span id="email">Young Professional</span>
//                     <i className="fas fa-bars float-right"   data-toggle="dropdown"></i>
//                     <div className="dropdown-menu dropdown-menu-right">
//                         <button className="dropdown-item" type="button"><i className="fas fa-sign-out-alt"></i> Logout</button>
//                     </div>
//                 </div>
//             </div>
            
            
//             <div className="adminMainContainer">
//                 <div className="d-flex justify-content-between">
//                     <div className="adminSidebar bg-white shadow border-10 adminContainer">
//                         <div className="container">
//                             <div className="c-grey mt-2"><strong>Home</strong><hr/></div>
//                             <div className="c-grey mt-2">
//                                 <i className="fas fa-square"></i> Orders
//                                 <div className="ml-3">
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Ordered</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Preparing</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Shipped</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Delivered</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Closed</div>
//                                 </div>
//                             </div>
//                             <div className="c-grey mt-2">
//                                 <i className="fas fa-cog"></i> Setup
//                                 <div className="ml-3">
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Shipping Fee</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Product</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Promo</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Reseller's Price</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Category</div>
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Type</div>
//                                 </div>
//                             </div>
//                             <div className="c-grey mt-2">
//                                 <i className="fas fa-square"></i> Tool Access
//                             </div>
//                             <div className="c-grey mt-2">
//                                 <i className="fas fa-square"></i> Global Setup
//                                 <div className="ml-3">
//                                     <div className="m-1 mt-2"><i className="fas fa-square"></i> Company</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="adminMain">
//                         <div className="container-fluid p-0 ">
//                             <div>2</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
 
// export default Dashboard;


import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';


import { useState } from 'react';

import PofshopIcon from '../../layouts/images/pofShop.png';


import PofshopBanner from '../../layouts/images/banners.jpg';

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";



const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        marginTop: 120,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        marginTop: 120,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
  
}));

export default function Dashboard() {
    // const sliderBanner = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000
    // };

    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };


    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
            >
                <nav id="navbar" className="c-c72c41 d-none d-md-block">
                    <div className="text-left position-absolute pl-2">
                        <span className="navbar-brand" ><img id="main-logo" src={PofshopIcon} alt="PoFShop" /><strong id="main-name" className="c-white"> &nbsp; POFSHOP</strong></span>
                    </div>
                    <div className="text-right pr-2">
                        <span className="pof-btn c-white" id="pof=personal" ><strong>My Personal</strong></span>
                        <span className="pof-btn pof-category c-white" id="pof-business" ><strong>My Business</strong></span>
                    </div>
                </nav>
                <div id="menubar" className="d-flex">
                    <div id="L-menu" className="d-sm-block">
                        <span onClick={handleDrawerOpen}>Menu</span>
                        <i className="fas fa-bars float-right"  id="menu"></i>
                    </div>
                    <div id="C-menu" className="d-flex justify-content-between">
                        <div id="menu-search">
                            <i className="fas fa-search c-grey" id="search-btn"></i>
                            <input type="text" placeholder="Search..." id="nav-search" />   
                        </div>
                        <div id="menu-cart">
                        </div>
                    </div>
                    <div id="R-menu" >
                        <i className="fas fa-user pr-2 pt-1"></i>
                        <span id="name">Rannie&nbsp;Pavillon</span>
                        <span id="email">Young Professional</span>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button"><i className="fas fa-sign-out-alt"></i> Logout</button>
                        </div>
                    </div>
                </div>
            </AppBar>
            <Drawer
                variant="permanent"
                className={`d-none d-md-block ${clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}`}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <Divider />
                    <List>
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >All Products</ListItemText >
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >Bundle</ListItemText >
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >Best seller</ListItemText >
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >Promo</ListItemText >
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText >Cooking Menu</ListItemText >
                        </ListItem>
                    </List>
                <Divider />
            </Drawer>
            <div className="mainContainer">
                <div className="MainBanner d-md-flex">
                    {/* <Slider {...sliderBanner}>
                        <div>
                            <div className="border-10 headBanner"  style={{
                                    backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161881059720210419133637.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                                }}>
                            </div>
                        </div>
                    </Slider> */}
                    {/* <div className="border-10 advertiseBanner"  style={{
                            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161881059720210419133637.jpg")`,backgroundRepeat: 'no-repeat',width:'100px',height:'100px',backgroundSize:'cover',backgroundPosition:'center center'
                        }}>
                    </div> */}
                    <img src={PofshopBanner } className="border-10 headBanner" alt="PofShop" width="100% "  height="250px"/> 
                    <img src={PofshopBanner } className="border-10 advertiseBanner" alt="PofShop" height="250px" /> 
                </div>
            </div>
            
        </div>
    );
}