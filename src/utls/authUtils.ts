import jwt from "jsonwebtoken";

export const isTokenExpiredFunction = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as { exp: number };
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Token expiration:", decoded.exp, "Current time:", currentTime);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const getTokenContent = (token: string): any => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
};
