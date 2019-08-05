

export function matcher(routes, path) {

    /*
  const parts = path.split(/\//);

/*
  console.log(parts);
  
  const leftFragment = '/' + parts[0];
  
  console.log(routes.filter(r => r.path.startsWith(leftFragment)));
*/

  return routes.find(r => r.path === path);
}
