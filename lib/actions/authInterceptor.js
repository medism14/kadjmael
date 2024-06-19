import { decode } from "base-64";
global.atob = decode;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isRefreshingToken = false;
let failedQueue = [];

const authInterceptor = async (config) => {
  try {
    const excludedEndpoints = [
      "http:/192.168.178.159:3000/users/login",
      "http:/192.168.178.159:3000/users",
      "http://192.168.178.159:3000/users/refreshToken",
      "http:/192.168.178.159:3000/users/sendMail",
    ];

    if (excludedEndpoints.includes(config.url)) {
      return config;
    }

    const token = await getAccessToken();

    if (!token) {
      throw new Error("Token non disponible")
    }
    console.log(token);

    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else if (token && isTokenExpired(token)) {
      return handleTokenRefresh(config);
    }
    return config;
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    throw error;
  }
};

function extractExpirationDateFromToken(token) {
  try {
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const decodedPayload = decode(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    return payload.exp;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}

const isTokenExpired = (token) => {
  try {
    const expirationTimestamp = extractExpirationDateFromToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTimestamp < currentTime;
  } catch (error) {
    console.error("Erreur lors du décodage", error);
  }
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token non trouvé");
    }
    const response = await axios.post(
      "http://192.168.178.159:3000/users/refreshToken",
      { refreshToken }
    );
    const { newAccessToken, newRefreshToken } = await response.data;

    if (!newAccessToken || !newRefreshToken) {
      throw new Error("Tokens non reçus lors du rafraîchissement");
    }

    await AsyncStorage.setItem("accessToken", newAccessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    throw error;
  }
};

const handleTokenRefresh = async (config) => {
  const originalRequest = config;
  if (!isRefreshingToken) {
    isRefreshingToken = true;

    try {
      const newToken = await refreshToken();
      isRefreshingToken = false;
      processQueue(null, newToken);
      return {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };
    } catch (error) {
      isRefreshingToken = false;
      processQueue(error, null);
      throw error;
    }
  } else {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, originalRequest });
    });
  }
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve({
        ...prom.originalRequest,
        headers: {
          ...prom.originalRequest.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    }
  });
  failedQueue = [];
};

export default authInterceptor;
