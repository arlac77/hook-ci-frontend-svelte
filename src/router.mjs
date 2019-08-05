export class Router {
  constructor(routes = [], prefix='') {
    let current;

    Object.defineProperties(this, {
      prefix: { value: prefix },
      subscriptions: { value: [] },
      routes: { value: routes },
      current: {
        get() {
          return current;
        },
        set(value) {
          current = value;
          this.subscriptions.forEach(subscription => subscription(this));
        }
      }
    });

    window.addEventListener(
      "routerLink",
      function(event) {
        let path = event.detail.path;

        if(path.startsWith(this.prefix)) {
          history.pushState(event.detail, "", path);
          path = path.substring(this.prefix.length);
        }
        else {
          event.detail.path = this.prefix + path;
          history.pushState(event.detail, "", this.prefix + path);
        }

        this.push(path);
      }.bind(this)
    );

    window.addEventListener(
      "popstate",
      function(event) {
        console.log("POPSTATE", event);
      }.bind(this)
    );

    setTimeout(() => this.initializeCurrent(), 10);
  }

  add(routes) {
    this.routes.push(...routes);
  }

  initializeCurrent()
  {
    const path = window.location.pathname + window.location.search;
    console.log("INIT", path);

    this.push(path);
  }

  get currentComponent() {
    const r = this.current;
    return r !== undefined && r.component;
  }

  push(path) {
    console.log("PUSH", path);
    this.current = this.routes.find(r => r.path === path);
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }
}

export function route(path, component) {
  return {
    path,
    component
  };
}
