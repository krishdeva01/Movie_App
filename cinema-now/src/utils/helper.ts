export const isUserLoggedIn = (key: string): boolean => {
  const accessToken = getStorage(key);
  let isAuthenticated = false;

  if (accessToken) {
    const payload = parseJwt(accessToken);
    const exp = payload.exp;
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    if (secondsSinceEpoch < exp) {
      isAuthenticated = true;
    }
  }
  return isAuthenticated;
};

export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

// interface JWTPayload {
//   exp: number;
//   [key: string]: any;
// }

// export const decodeJWT = (token: string): JWTPayload => {
//   return jwt_decode<JWTPayload>(token);
// };

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.log(e);

    return null;
  }
};
