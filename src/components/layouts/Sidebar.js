import { Link } from 'react-router-dom';
import { useContext } from 'react';
import clsx from 'clsx';

import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText , makeStyles} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { SideContext } from '../context/SideContext';


const drawerWidth = 220;

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

const Sidebar = () => {
    const classes = useStyles();
    const {sidebar}  = useContext(SideContext)
    const [sidebarLeft] = sidebar
  
    return ( 
        <>
            <Drawer
                variant="permanent"
                className={`d-none d-md-block ${clsx(classes.drawer, {
                    [classes.drawerOpen]: !sidebarLeft,
                    [classes.drawerClose]: sidebarLeft,
                })}`}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: !sidebarLeft,
                        [classes.drawerClose]: sidebarLeft,
                    }),
                }}
            >
                <Divider />
                    <List>
                        <Link to="/" className="c-black">
                            <ListItem button >
                                <ListItemIcon><InboxIcon /> </ListItemIcon>
                                <ListItemText >HOME</ListItemText >
                            </ListItem>
                        </Link>
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
            <div className={`bg-white border-10 shadow d-block d-md-none ${sidebarLeft ? 'sidebarToggleLeft':'sidebarToggleLeft-active'}`}>
                <Divider />
                    <List>
                        <Link to="/" className="c-black">
                            <ListItem button >
                                <ListItemIcon><InboxIcon /> </ListItemIcon>
                                <ListItemText >HOME</ListItemText >
                            </ListItem>
                        </Link>
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
            </div>
        </>
    );
}
 
export default Sidebar;