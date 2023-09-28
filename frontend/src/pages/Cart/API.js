import { cartBaseUrl } from "../../constants";

export async function getCartItemsAPI() {
  try {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };

    const response = await fetch(`${cartBaseUrl}/api/cart/`, requestOptions);

    const result = await response.json();
    const cartItems = result?.cartItems;

    return { statusCode: response.status, cartItems };
  } catch (error) {
    return false;
  }
}

export async function setCartItemsAPI(productId, quantity) {
  try {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: Number(quantity),
      }),
    };

    const response = await fetch(`${cartBaseUrl}/api/cart/`, requestOptions);

    const result = await response.json();
    const msg = result?.msg;

    return { statusCode: response.status, msg };
  } catch (error) {
    return false;
  }
}
