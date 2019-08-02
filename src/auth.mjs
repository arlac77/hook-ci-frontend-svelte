import { config } from "../package.json";

export async function authenticate(username, password) {
  const response = await fetch(config.api + "/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  const token = data.token;
  window.localStorage.access_token = token;

  const jwtData = decode(token);

  console.log(jwtData);
}

/**
 * @return {boolean} true if authentification is required
 */
export function needsAuthentication() {
  return isTokenExpired(window.localStorage.access_token);
}

export const entitlements = new Set();

export function hasEntitlement(name) {
  return entitlements.has(name);
}

function decode(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

export function isTokenExpired(token) {
  if(token === undefined) return true;

  const decoded = decode(token);
  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(decoded.exp);

  entitlements.clear();
  decoded.entitlements.split(/,/).forEach(e => entitlements.add(e));
  
  return expirationDate.valueOf() < new Date().valueOf();
}
