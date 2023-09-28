import "../../index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar/Navbar";
import { getCartItemsAPI, setCartItemsAPI } from "../Cart/API";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCarItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getUser = () => {
      let user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user?.token) navigate("/");
      else {
        getCartItems();
      }
    };

    getUser();
  }, []);

  const notify = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
    }
  };

  const getCartItems = async () => {
    const response = await getCartItemsAPI();

    if (!response) {
      notify("Server is down!", "error");
      return;
    }

    const { statusCode, cartItems } = response;

    if (statusCode != 200) {
      notify("Something went wrong!", "error");
      return;
    }

    setCarItems(cartItems);
  };

  const addProductToCart = async (productId, quantity) => {
    const response = await setCartItemsAPI(productId, quantity);

    if (!response) {
      notify("Server is down!", "error");
      return;
    }

    const { statusCode, msg } = response;

    if (statusCode == 200) {
      console.log(msg);
      notify(msg, "success");
      getCartItems();
      return;
    }

    notify(msg, "error");
  };

  return (
    <div className="container">
      <Navbar cartCount={cartItems.length} />
      {!cartItems.length ? (
        <div className="center-div">
          <h4>Your cart is empty!</h4>
        </div>
      ) : (
        cartItems.map(({ product }) => (
          <div className="card" style={{ width: "18rem" }} key={product._id}>
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price - ${product.price}</p>
              <label>Select Quanity</label>
              <input
                className="form-control mb-2"
                min="0"
                max={product.quantity}
                type="number"
                defaultValue={cartItems.length}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => addProductToCart(product._id, quantity)}
              >
                Update quantity
              </button>
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
