import { userBaseUrl } from "../../constants";

export async function loginUserAPI(email, password) {
  try {
    const myHeaders = {
      "Content-Type": "application/json",
    };

    const requestBody = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestBody,
    };

    const response = await fetch(`${userBaseUrl}/auth/login/`, requestOptions);

    const result = await response.json();
    const user = result?.user;
    user.token = result?.token;

    const msg = result?.msg;

    return { statusCode: response.status, user, msg };
  } catch (error) {
    return false;
  }
}

export async function registerUserAPI(displayName, email, password) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBody = JSON.stringify({
      displayName,
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestBody,
    };

    const response = await fetch(
      `${userBaseUrl}/auth/register/`,
      requestOptions
    );

    const result = await response.json();
    const resultMsg = result?.msg;

    return { statusCode: response.status, resultMsg };
  } catch (error) {
    return false;
  }
}
