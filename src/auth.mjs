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
  window.localStorage.token = token;

  const jwtData = decode(token);

  console.log(jwtData);

  const decoded = decode(token);
  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(decoded.exp);

  const now = new Date();

  console.log(now, expirationDate);
}

function decode(token)
{
  return JSON.parse(atob(token.split(".")[1]));
}

export function isTokenExpired(token) {
  try {
    const date = new Date(0);
    const decoded = decode(token);
    date.setUTCSeconds(decoded.exp);
    return date.valueOf() > new Date().valueOf();
  } catch (err) {
    return false;
  }
}