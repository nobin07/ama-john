import React, { useState, useEffect } from 'react';
import happyImage from '../../images/giphy.gif'
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced,setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }
    const handleRemoveProduct = (productKey)=>{
            const newCart = cart.filter(pd => pd.key !== productKey)
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key=>{
            const products = fakeData.find(pd =>pd.key ===key)
            products.quantity = savedCart[key]
            return products
        })
        setCart(cartProducts)
    },[])
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>

    }
    return (
        <div className='ShopAndReview-container'>
           <div className="product-container">
           {
               cart.map(pd => <ReviewItem
               handleRemoveProduct = {handleRemoveProduct}
               key = {pd.key}
                 product = {pd}></ReviewItem>)
           }
           {thankYou}
           {
               !cart.length && <h1>Your cart is empty. <a href="/shop">Click to Shop</a> </h1>
           }

           </div>
           <div className="cart-container">
               <Cart cart = {cart}>
                   <Link to ="/Shipment">
                    {
                        auth.user ? 
                        <button className="main-button">Proceed CheckOut </button>
                        :
                        <button className="main-button">Login to Proceed </button>
                        }
                   </Link>
               </Cart>
           </div>
          
        </div>
    );
};

export default Review;