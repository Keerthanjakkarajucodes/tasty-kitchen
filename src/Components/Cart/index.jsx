import NavBar from "../NavBar"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increment, decrement, clearCart } from "../../Redux/CartSlice";
import Footer from "../Footer";
import './index.css'

function Cart(){
    const cartItems=useSelector((state)=>state.cart.items)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
    };

    const handlePlaceOrder = () => {
        dispatch(clearCart());
        navigate("/payment-success");
  };

  if(cartItems.length===0){
    return(
        <div className="cart-main-div">
        <NavBar/>
        <div className="empty-cart">
        <img
            src="https://i.postimg.cc/Hn0d8Mkx/cooking-1.png"
            alt="empty"
            className="empty-image"
          />
          <h2>No Orders Yet!</h2>
          <p>Your cart is empty. Add something from the menu.</p>
          <button onClick={() => navigate("/")} className="order-now-btn">Order Now</button>
        </div>
        </div>
    )
  }

  return(
    <div className="cart-main-div">
    <NavBar/>
    <div className="cart-container">
        <table className="cart-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
                        <tbody> {/* Added tbody for semantic HTML */}
                {cartItems.map(item => (
                    <tr key={item.id}>
                        <td className="item-details">
                            <img src={item.image_url} alt={item.name} className="cart-img" />
                            {/* New wrapper div for name, quantity, and price on mobile */}
                            <div className="item-info-mobile-wrapper">
                                <span className="item-name-mobile">{item.name}</span>
                                <div className="quantity-buttons-mobile"> {/* Use a distinct class for mobile quantity buttons */}
                                    <button onClick={() => dispatch(decrement(item.uniqueId))}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increment(item.uniqueId))}>+</button>
                                </div>
                                <span className="item-price-mobile">₹ {(item.cost * item.quantity).toFixed(2)}</span>
                            </div>
                        </td>
                        {/* These cells will be hidden on mobile by CSS, but are needed for desktop */}
                        <td className="desktop-only-quantity">
                            <div className="quantity-buttons">
                                <button onClick={() => dispatch(decrement(item.uniqueId))}>−</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => dispatch(increment(item.uniqueId))}>+</button>
                            </div>
                        </td>
                        <td className="desktop-only-price">₹ {(item.cost * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

         <div className="cart-total">
          <p>Order Total : ₹ {getTotal().toFixed(2)}</p>
          <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
        </div>
      </div>
    
      <Footer/>
    </div>
  )
}

export default Cart