export function matcher(routes, path) {
  const params = {};

  /*
  const parts = path.split(/\//);

/*
  console.log(parts);
  
  const leftFragment = '/' + parts[0];
  
  console.log(routes.filter(r => r.path.startsWith(leftFragment)));
*/

  return { route: routes.find(r => r.path === path), params };
}

/*
node --experimental-modules route-matcher.mjs


const routes = [{ path: "/a/b" }, { path: "/a/b/c" }, { path: "/d/:e/f" }];

check(routes, "/a/b", routes[0]);
check(routes, "/a/b/c", routes[1]);
check(routes, "/d/x/f", routes[2], { e: "x" });

function check(routes, path, route, params = {}) {
  const r = matcher(routes, path);

  if (r.route === route && equal(r.params, params)) {
    console.log("OK", path);
  } else {
    console.log("NO OK", path, route, r.route, params, r.params);
  }
}

function equal(a, b) {
  for (const k of Object.keys(a)) {
    if (a[k] !== b[k]) return false;
  }

  return Object.keys(a).length === Object.keys(b).length;
}
*/