import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import { addItem, increment, decrement } from "../../Redux/CartSlice";
import "./index.css";

function SpecificRestaurantDetails() {
  const { id } = useParams(); // restaurant id
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const jwtToken = Cookies.get("jwt_token");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const apiUrl = `https://tasty-kitchen-backend-1.onrender.com/api/restaurants/${id}/fooditems`;
      const options = { method: "GET", headers: { Authorization: `Bearer ${jwtToken}` } };

      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const data = await response.json();
          setRestaurantDetails(data);
          setTimeout(() => setIsLoading(false), 300);
        } else {
          console.error("Failed to fetch restaurant details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRestaurantDetails();
  }, [id, jwtToken]);

  if (isLoading)
    return (
      <div className="page-loader-container">
        <div className="loader"></div>
      </div>
    );

  const { name, cuisine, location, cost_for_two, rating, reviews_count, image_url, food_items } = restaurantDetails;

  const getItemQuantity = (uniqueId) => {
    const item = cartItems.find((i) => i.uniqueId === uniqueId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="specific-main-div">
      <NavBar />

      <div className="restaurant-banner">
        <img src={image_url} alt={name} className="restaurant-image-overlay" />
        <div className="restaurant-info">
          <h2>{name}</h2>
          <p>{cuisine}</p>
          <p>{location}</p>
          <div className="restaurant-meta">
            <p>
              ⭐ {rating} <br /> {reviews_count}+ Ratings
            </p>
            <p>
              ₹ {cost_for_two} <br /> Cost for two
            </p>
          </div>
        </div>
      </div>

      <ul className="food-items-list">
        {food_items.map((item) => {
          const uniqueId = `${item.id}-${id}`; // corrected unique id
          const quantity = getItemQuantity(uniqueId);

          return (
            <li key={uniqueId} className="food-card">
              <img src={item.image_url} alt={item.name} className="food-image" />
              <div className="food-details">
                <h4>{item.name}</h4>
                <p>₹ {item.cost}.00</p>

                {quantity === 0 ? (
                  <button
                    className="add-button"
                    onClick={() =>
                      dispatch(
                        addItem({
                          uniqueId,
                          name: item.name,
                          cost: item.cost,
                          image_url: item.image_url,
                          restaurantId: id,
                        })
                      )
                    }
                  >
                    ADD
                  </button>
                ) : (
                  <div className="quantity-controller">
                    <button className="qty-btn" onClick={() => dispatch(decrement(uniqueId))}>
                      −
                    </button>
                    <span className="qty-count">{quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(increment(uniqueId))} disabled={quantity >= 10}>
                      +
                    </button>
                    {quantity >= 10 && <p className="max-limit-message">Max limit reached</p>}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <Footer />
    </div>
  );
}

export default SpecificRestaurantDetails;
