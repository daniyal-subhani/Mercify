/**
 * Check if running in a browser environment
 */
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Get a cookie by name
 * @param {string} name
 * @returns {string|null}
 */
export function getCookie(name) {
  if (!isBrowser) return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

/**
 * Set a cookie
 * @param {string} name
 * @param {string} value
 * @param {object} options - { days, path, domain, secure, sameSite }
 */
export function setCookie(name, value, options = {}) {
  if (!isBrowser) return;

  const {
    days = 7,
    path = "/",
    domain,
    secure = true,
    sameSite = "Lax",
  } = options;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=${path};`;

  if (domain) cookieString += ` domain=${domain};`;
  if (secure) cookieString += ` Secure;`;
  if (sameSite) cookieString += ` SameSite=${sameSite};`;

  document.cookie = cookieString;
}

/**
 * Delete a cookie
 * @param {string} name
 * @param {object} options - { path, domain }
 */
export function deleteCookie(name, options = {}) {
  if (!isBrowser) return;

  const {
    path = "/",
    domain,
  } = options;

  let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;

  if (domain) cookieString += ` domain=${domain};`;
  document.cookie = cookieString;
}

export default {
  getCookie,
  setCookie,
  deleteCookie,
};
