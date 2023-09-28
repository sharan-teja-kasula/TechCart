import { productBaseUrl } from "../../constants";

export async function getProductsAPI() {
  try {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;

    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };

    const response = await fetch(
      `${productBaseUrl}/api/product/`,
      requestOptions
    );

    const result = await response.json();
    const products = result?.products;

    return { statusCode: response.status, products };
  } catch (error) {
    return false;
  }
}
