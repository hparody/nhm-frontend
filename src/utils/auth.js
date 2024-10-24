import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("user");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp >= currentTime;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { isAuthenticated };
