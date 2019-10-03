

export class Node {
  constructor(name, options) {
    Object.defineProperties(this, {
      name: { value: name },
      version: { value: options.version },
      uptime: { value: options.uptime },
      isLocal: { value: options.isLocal },
      memory: { value: options.memory }
    });
  }
}

