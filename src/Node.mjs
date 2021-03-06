export class Node {
  constructor(name, options) {
    Object.defineProperties(this, {
      name: { value: name }
    });

    this.update(options);
  }

  update(options) {
    if (options === undefined) {
      return;
    }

    Object.defineProperties(this, {
      version: { value: options.version },
      uptime: { value: options.uptime },
      isLocal: { value: options.isLocal },
      memory: { value: options.memory },
      env: {
        value: options.env ? options.env.reduce((a, c) => {
          a[c.key] = c.value;
          return a;
        }, {}) : {}
      }
    });
  }

  toJSON() {
    return {
      name: this.name
    };
  }
}
