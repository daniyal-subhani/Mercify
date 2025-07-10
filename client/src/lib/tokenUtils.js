
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp < currentTime;
  } catch (err) {
    console.error("Token parsing error:", err);
    return true;
  }
};
