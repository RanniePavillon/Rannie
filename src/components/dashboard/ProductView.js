import {  useContext} from 'react';
import axios from "axios";

import {makeStyles , Button , TextField , Checkbox , Avatar} from "@material-ui/core";
import {Rating , Skeleton} from '@material-ui/lab';

import swal from 'sweetalert';

import { SideContext } from '.././context/SideContext';
import { ProductContext } from '.././context/ProductContext';

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none"
    },
    textField: {
        width: 100
    },
}));

const ProductView = ({getAllCart , getAllNextOrder}) => {
    const classes = useStyles();
   
    const {productView,cart,view_cart}  = useContext(SideContext)
    const [sidebarProductView,setSidebarProductView] = productView
    const [sidebarCart,setSidebarCart] = cart
    const [showCart , setShowCart] = view_cart


    const {next_order,next_subtotal,product_data,cart_data,loading_prod_view,prod_quantity,cart_subtotal}  = useContext(ProductContext)
    const [loadingProductView] = loading_prod_view
    const [productData , setProductData] = product_data
    const [cartData,setCartData] = cart_data
    const [cartSubtotal , setCartSubtotal] = cart_subtotal
    const [quantity, setQuantity] = prod_quantity

    const [nextOrder,setNextOrder] = next_order
    const [nextSubtotal,setNextSubtotal] = next_subtotal

    const validateNumber = (e) => {
        if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
        }
    }

    const handleClose = () =>{
        setSidebarProductView(false)
    }

    const handleChange = (prop) => (event) => {
        setQuantity({...quantity, [prop]: event.target.value });
    };

    const handleClick = (e) =>{
        let val = e.currentTarget.getAttribute('value')
        if (quantity['prod_quantity'] === '') {
            setQuantity({...quantity, prod_quantity:(+1).toFixed(2)});
        }else{
            if (val === 'plus') {
                setQuantity({...quantity, prod_quantity:(JSON.parse(quantity['prod_quantity']) +1).toFixed(2)});
            }else{
                if (quantity['prod_quantity'] >= 0.9999) {
                    setQuantity({...quantity, prod_quantity:(JSON.parse(quantity['prod_quantity']) -1).toFixed(2)});
                }
            }
        } 
    }

    const addToCart = (e) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-type","application/json");

        const post = {product:productData , quantity:quantity}
        var raw = JSON.stringify(post)
        var requestOptions = {
            method:'POST',
            headers:myHeaders,
            body:raw,
            redirect:'follow',
        };
        fetch(`https://nbkeagfoql.execute-api.ap-southeast-1.amazonaws.com/dev/cart/add-cart`, requestOptions)
        .then(response => response.text())
        .then((response) => {
            swal({
                title: "Please give us a moment!",
                text: "This may take a seconds depending on the size of the data and/or your network connection",
                icon: "success",
                button:false,
                timer:1000,
            });
            getAllCart()
            getAllNextOrder()
        })
        .catch((error) => {
            swal("Something went wrong ", {
                icon: "warning",
                button:false,
                timer:1000,
            });
        });
        // setSidebarProductView(false)
        // setShowCart(true)
        // setSidebarCart(true) 
    }

    const checkoutProduct = () =>{
        
        setShowCart(false)
        setSidebarCart(true) 
        setSidebarProductView(false)
    }

    return ( 
        <>  
            <div className="container-fluid d-flex flex-row-reverse p-0 ">
                <div className={!sidebarProductView ? 'sideProduct prodMainContanier':'sideProduct-active bg-white border-10 shadow prodMainContanier'}>
                    <div className="d-flex flex-row-reverse" onClick={handleClose}><i className="fas fa-times-circle asdasd float-right"  aria-hidden="true" ></i></div>
                    {loadingProductView ? (
                        <div>
                            <div className="container d-flex flex-column align-items-around" style={{height:800}}>
                                <div className="card-body">
                                    <div><Skeleton height={150}/></div>
                                    <div><Skeleton height={150}/></div>
                                    <div><Skeleton height={150}/></div>
                                    <div><Skeleton height={150}/></div>
                                    <div><Skeleton height={150}/></div>
                                </div>
                            </div>
                        </div>
                    ): (
                        productData.map((p,i)=>(
                            <div key={p.id}>
                                <div className="card">
                                    <div className="m-2"><Skeleton height={40}/></div>
                                    <div className="m-2"><Skeleton height={40}/></div>
                                    <div className="m-2"><Skeleton height={40}/></div>
                                    <div className="m-2"><Skeleton height={40}/></div>
                                    {/* <div className="border-10 cartImg"  style={{
                                            backgroundImage: `url("https://s3.ap-southeast-1.amazonaws.com/dadas-online-ordering/local-assets/161853773820210416094858.jpg")`,backgroundRepeat: 'no-repeat',width:'100%',height:'250px',backgroundSize:'cover',backgroundPosition:'center center'
                                        }}>
                                    </div> */}
                                </div>
                                <div className="card-body pt-1 pb-2 d-flex justify-content-between">
                                    <div>
                                        <div><strong>{p.name}</strong></div>
                                        <div className="f-13 text-center">(1pc)</div>
                                    </div>
                                    <div>
                                        <Button className={`${classes.button} f-20 c-red`}><i className="fas fa-heart"></i></Button>
                                        <Button className={`${classes.button} f-20`}><i className="fas fa-share-alt"></i></Button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex align-items-center"><Rating name="read-only" value={4} size="small" readOnly /> <span> 4.0</span></div>
                                        <div className="ml-3 mr-3">|</div>
                                        <div><span> 30 Ratings</span></div>
                                        <div className="ml-3 mr-3">|</div>
                                        <div className=""><span>50 Sold</span></div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div><strong className="c-red f-20">P{(p.unit_price - 0).toFixed(2)}</strong></div>
                                    <div className="d-flex justify-content-between">
                                        <div className="f-12 c-grey"><del>P 50000.00</del></div>    
                                        <div className="f-12 c-grey">Discount 5.00% Regular Price 50000.00</div>    
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div>
                                        <strong>Size : </strong>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-c72c41 c-white f-12 ${classes.button}`}>size</Button>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-grey f-12 ${classes.button}`}>size</Button>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-grey f-12 ${classes.button}`}>size</Button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div>
                                        <strong>Flavor : </strong>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-c72c41 c-white f-12 ${classes.button}`}>Flavor</Button>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-grey f-12 ${classes.button}`}>Flavor</Button>
                                        <Button variant="contained" size="small" className={`border-15 m-1 c-grey f-12 ${classes.button}`}>Flavor</Button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div>
                                        <strong>Quantity : </strong>
                                            <Button value="minus" onClick={handleClick}>-</Button>
                                            <TextField 
                                                size="small"
                                                value={quantity.prod_quantity}
                                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                                onChange={handleChange('prod_quantity')}
                                                onKeyPress={validateNumber}
                                                className={classes.textField}
                                                name="prod-quantity"
                                            />
                                            <Button value="plus" onClick={handleClick}>+</Button>
                                        <span className="c-red f-12 ml-3">1110 avaliable</span>
                                    </div>
                                </div>
                                <div className="card-body pt-0 row">
                                    <div className="col-6"><Button variant="contained" onClick={addToCart} color="secondary" className={`btn-block ${classes.button}`}> Add to Cart </Button> </div>
                                    <div className="col-6"><Button variant="contained" onClick={checkoutProduct} className={`btn-block cartColor c-white ${classes.button}`}> Checkout </Button> </div>
                                </div>
                                <div className="card-body pt-0 f-14 ">
                                    <div className=" c-red">Product Details</div>
                                    <div className="c-grey"><Checkbox size="small" className="p-0" checked inputProps={{ 'aria-label': 'disabled checked checkbox' }}/>Sugar-free</div>
                                    <div className="c-grey"><Checkbox size="small" className="p-0" checked inputProps={{ 'aria-label': 'disabled checked checkbox' }}/>Gluten-free</div>
                                    <div className="c-grey"><Checkbox size="small" className="p-0" checked inputProps={{ 'aria-label': 'disabled checked checkbox' }}/>Low carb</div>
                                    <div className="c-grey"><Checkbox size="small" className="p-0" checked inputProps={{ 'aria-label': 'disabled checked checkbox' }}/>Keto approved</div>
                                    <div className="c-grey"><Checkbox size="small" className="p-0" checked inputProps={{ 'aria-label': 'disabled checked checkbox' }}/>Diabetic friendly</div>
                                </div>
                                <div className="card-body pt-0 f-14 ">
                                    <div className=" c-red">Product Desciption</div>
                                    <div className="c-grey">Product Desciption</div>
                                    <div className="c-grey">Product Desciption</div>
                                    <div className="c-grey">Product Desciption</div>
                                    <div className="c-grey">Product Desciption</div>
                                    <div className="c-grey">Product Desciption</div>
                                </div>
                                <div className="card-body pt-0 f-14 ">
                                    <div className=" c-red"><strong>Notes</strong></div>
                                    <div className=" c-grey">Wrong placement of shipping fee will not be process</div>
                                </div>
                                <div className="card-body pt-0 f-14 ">
                                    <div className="mb-2 c-red"><strong>Product Reviews</strong></div>
                                    <div className="row">
                                        <div className="col-2 c-grey"><Avatar src="/broken-image.jpg" /></div>
                                        <div className="col-6 ">
                                            <div><strong>John Paulo Moreno</strong></div>
                                            <div><Rating name="read-only" value={5} size="small" readOnly /></div>
                                        </div>
                                        <div className="col-12">Masarap</div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                    </div><br/>
                                    <div className="row">
                                        <div className="col-2 c-grey"><Avatar src="/broken-image.jpg" /></div>
                                        <div className="col-6 ">
                                            <div><strong>Niel Coleen</strong></div>
                                            <div><Rating name="read-only" value={5} size="small" readOnly /></div>
                                        </div>
                                        <div className="col-12">Masarap</div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                    </div><br/>
                                    <div className="row">
                                        <div className="col-2 c-grey"><Avatar src="/broken-image.jpg" /></div>
                                        <div className="col-6 ">
                                            <div><strong>Rannie Pavillon</strong></div>
                                            <div><Rating name="read-only" value={5} size="small" readOnly /></div>
                                        </div>
                                        <div className="col-12">Masarap</div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                        <div className="col-4">
                                            <Skeleton />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </div>
                                    </div><br/>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
 
export default ProductView;